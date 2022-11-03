import Tag from "src/pages/api/models/tag";
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
    const userId = req.query.userId;
    const tags = await Tag.find({ userId: userId });
    res.json(tags);
  });

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
