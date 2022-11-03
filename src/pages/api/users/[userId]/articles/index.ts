import Article from "src/pages/api/models/article";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectMongo from "src/pages/api/utils/connectMongo";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(async (req, _, next) => {
    await connectMongo();
    await next();
  })
  .get(async (req, res) => {
    const { userId, q } = req.query;
    if (q === "undefined") {
      const articles = await Article.find({ email: userId });
      res.json(articles);
    }
    const articles = await Article.find({
      email: userId,
      tags: { $in: q },
    });
    res.json(articles);
  });

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
