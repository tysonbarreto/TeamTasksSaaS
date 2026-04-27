import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { app } from "./app.ts";
import { connectDB } from "./infrastructure/database.ts";

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI as string;

const startServer = async () => {
  await connectDB(MONGO_URI);
};

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

startServer();
