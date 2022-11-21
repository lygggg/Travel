import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { deleteImage } from "./utils/s3Client.js";
import { withSentry } from "@sentry/nextjs";

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
    await next();
  })
  .post(async (req, res) => {
    const imageKey = req.body;
    try {
      await deleteImage(imageKey);
    } catch {
      res.status(400).end();
    }
    res.status(200).end();
  });

export default withSentry(handler);
