import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { deleteImage } from "./utils/s3Client.js";

const router = createRouter<NextApiRequest, NextApiResponse>();
router.use(async (req, _, next) => {
  await next();
});
router.post(async (req, res) => {
  const imageKey = req.body;
  try {
    await deleteImage(imageKey);
  } catch {
    res.status(400).end();
  }
  res.status(200).end();
});

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
