import { Schema, model, models } from "mongoose";

const articleSchema = new Schema({
  title: { type: String, required: true },
  tag: { type: String, required: true },
  content: { type: String, required: true },
  syncTime: { type: Date, default: Date.now },
});
const ArticleModel = models.Article || model("Article", articleSchema);

export default ArticleModel;
