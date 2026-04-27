import mongoose from "mongoose";
import { logger } from "./logger";

export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    logger.info("📦 Connected to MongoDB");
  } catch (error) {
    logger.error({ error }, "❌ Mongo connection error");
    process.exit(1);
  }
};
