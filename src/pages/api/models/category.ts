import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
  categoryName: { type: String, required: true },
  articleId: { type: String, required: true },
  userId: { type: String, require: true },
});
const CategoryModel = models.Category || model("Category", categorySchema);

export default CategoryModel;
