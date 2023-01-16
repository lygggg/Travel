import { withSentry } from "@sentry/nextjs";
import { ArticleModel } from "src/pages/api/models/article";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectMongo } from "src/pages/api/utils/connectMongo";

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
    const articles = await ArticleModel.find().sort({ syncTime: -1 });
    res.json(articles);
  });

export default withSentry(handler);
