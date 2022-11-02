import { Schema, model, models } from "mongoose";

const tagSchema = new Schema({
  tagName: { type: String, required: true },
  userId: { type: String, require: true },
});
const TagModel = models.Tag || model("Tag", tagSchema);

export default TagModel;
