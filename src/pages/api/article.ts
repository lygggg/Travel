import router from "./index";
import Article from "./models/article";
import connectMongo from "./utils/connectMongo.js";

router.post(async (req, res) => {
  const { content, tag, title } = req.body;
  console.log(content, tag, title);
  const article = await Article.create({
    content: content,
    tag: tag,
    title: title,
  });
  res.json({ article: article });
});

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
