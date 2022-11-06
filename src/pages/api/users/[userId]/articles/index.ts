import Article from "src/pages/api/models/article";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectMongo from "src/pages/api/utils/connectMongo";

const NEXT_PAGE = 5;

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(async (req, _, next) => {
    await connectMongo();
    await next();
  })
  .get(async (req, res) => {
    const { userId, q, page } = req.query;
    const pageNum = parseInt(page) * NEXT_PAGE;
    const total = await Article.find({ email: userId }).count();
    if (q === "undefined") {
      const articles = await Article.find({ email: userId })
        .sort({ syncTime: 1 })
        .limit(pageNum);
      res.json({ articles, total });
    }
    const articles = await Article.find({
      email: userId,
      tags: { $in: q },
    })
      .sort({ syncTime: -1 })
      .skip(0)
      .limit(pageNum);
    res.json({ articles, total });
  });

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
