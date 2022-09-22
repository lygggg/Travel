import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
const connectMongo = async () => {
  if (!global.mongoose) {
    global.mongoose = mongoose.connect(MONGO_URI);
    global.mongoose();
  }
};
export default connectMongo;
