import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getToken } from "next-auth/jwt";
import Article from "./models/article";
import Tag from "./models/tag";
import connectMongo from "./utils/connectMongo.js";

const secret = process.env.SECRET;

const router = createRouter<NextApiRequest, NextApiResponse>();
router
  .use(async (req, _, next) => {
    await connectMongo();
    await next();
  })
  .post(async (req, res) => {
    const { content, tags, title, thumbnailUrl, introduction, syncTime } =
      req.body;

    const { name, email }: any = await getToken({
      req: req,
      secret: secret,
    });

    const article = await Article.create({
      content,
      tags,
      title,
      name,
      email,
      thumbnailUrl,
      introduction,
      syncTime,
    });

    await Promise.all(
      tags.map((tag: string) => {
        return Tag.create({
          tagName: tag,
          userId: email,
        });
      }),
    );
    res.json(article);
  });

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
