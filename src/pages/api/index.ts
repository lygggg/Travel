import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectMongo from "./utils/connectMongo.js";

const router = createRouter<NextApiRequest, NextApiResponse>();
router.use(async (req, _, next) => {
  await connectMongo();
  await next();
});
export default router;
