import { TagModel } from "src/pages/api/models/tag";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { withSentry } from "@sentry/nextjs";
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
    const userId = req.query.userId;
    const tags = await TagModel.find({ userId: userId }).distinct("tagName");
    res.json(tags);
  });

export default withSentry(handler);
