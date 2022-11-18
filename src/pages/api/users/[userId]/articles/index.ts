import { withSentry } from "@sentry/nextjs";
import { ArticleModel } from "src/pages/api/models/article";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectMongo } from "src/pages/api/utils/connectMongo";

const NEXT_PAGE = 5;

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
handler
  .use(async (req, _, next) => {
    await connectMongo();
    await next();
  })
  .get(async (req, res) => {
    const { userId, q, page } = req.query;
    const pageNum = parseInt(page as string) * NEXT_PAGE;

    let total = await ArticleModel.find({
      email: userId,
    }).count();

    if (q === "all") {
      const articles = await ArticleModel.find({ email: userId })
        .sort({ syncTime: 1 })
        .limit(pageNum);
      res.json({ articles, total });
      return;
    }

    total = await ArticleModel.find({
      email: userId,
      tags: { $in: q },
    }).count();

    const articles = await ArticleModel.find({
      email: userId,
      tags: { $in: q },
    })
      .sort({ syncTime: -1 })
      .skip(0)
      .limit(pageNum);
    res.json({ articles, total });
  });

export default withSentry(handler);
