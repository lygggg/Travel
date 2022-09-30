import router from "./index";
import { deleteImage } from "./utils/s3Client.js";

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
