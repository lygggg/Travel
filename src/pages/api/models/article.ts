import { Schema, model, models } from "mongoose";

const articleSchema = new Schema({
  title: { type: String, required: true },
  tags: { type: [String] },
  content: { type: String },
  name: { type: String },
  email: { type: String },
  thumbnailUrl: { type: String },
  introduction: { type: String },
  syncTime: { type: String },
});
export const ArticleModel = models.Article || model("Article", articleSchema);
