import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getToken } from "next-auth/jwt";
import { withSentry } from "@sentry/nextjs";
import { ArticleModel } from "./models/article";
import { TagModel } from "./models/tag";
import { connectMongo } from "./utils/connectMongo.js";
import next from "next";

const secret = process.env.SECRET;

const handler = nc<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(400).json({ result: false, message: "Sorry!" });
  },
  onNoMatch(req, res) {
    res.status(404).json({ result: false, message: "Not Mached Method!" });
  },
});

handler
  .use(async (req, _, next) => {
    await connectMongo();
    await next();
  })
  .post(async (req, res, next) => {
    try {
      const { content, tags, title, thumbnailUrl, introduction, syncTime } =
        req.body;

      const { name, email }: any = await getToken({
        req: req,
        secret: secret,
      });
      const article = await ArticleModel.create({
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
          return TagModel.create({
            tagName: tag,
            userId: email,
            articleId: article._id,
          });
        }),
      );
      res.json(article);
    } catch (err) {
      console.log(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { id } = req.query;
      const { email }: any = await getToken({
        req: req,
        secret: secret,
      });
      const article = await ArticleModel.deleteOne({
        email: email,
        _id: id,
      });
      await TagModel.deleteMany({ email: email, articleId: id });
      res.status(201).json(article);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

export default handler;
