import router from "./index";
import Article from "./models/article";

router
  .get(async (req, res) => {
    const articles = await Article.find();
    res.json(articles);
  })
  .post(async (req, res) => {
    const { content, tag, title } = req.body;
    const article = await Article.create({
      content: content,
      tag: tag,
      title: title,
    });
    res.json(article);
  });

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
