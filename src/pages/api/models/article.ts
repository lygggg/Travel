import { Schema, model, models } from "mongoose";

const articleSchema = new Schema({
  title: { type: String, required: true },
  tags: { type: [String], required: true },
  content: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  introduction: { type: String, required: true },
  syncTime: { type: String, require: true },
});
const ArticleModel = models.Article || model("Article", articleSchema);

export default ArticleModel;
