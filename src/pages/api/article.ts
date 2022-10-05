import router from "./index";
import Article from "./models/article";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;
router
  .get(async (req, res) => {
    const { email }: any = await getToken({
      req: req,
      secret: secret,
    });
    const articles = await Article.find({ email: email });
    res.json(articles);
  })
  .post(async (req, res) => {
    const { content, tag, title, thumbnailUrl } = req.body;
    const { name, email }: any = await getToken({
      req: req,
      secret: secret,
    });
    const article = await Article.create({
      content: content,
      tag: tag,
      title: title,
      name: name,
      email: email,
      thumbnailUrl: thumbnailUrl,
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
