import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
const connectMongo = async () => await mongoose.connect(MONGO_URI);

export default connectMongo;
