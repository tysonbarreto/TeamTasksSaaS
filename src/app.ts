import express from "express";
import { errorHandler } from "./middleware/errorHandler.middleware.ts";
import { AppError } from "./utils/AppError";
import { requestLogger } from "./middleware/requestLogger.middleware.ts";
import authRoutes from "./modules/auth/auth.routes.ts";
import orgRoutes from "./modules/organization/organization.routes.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import { swaggerSpec } from "./config/swagger.ts";
import swaggerUi from "swagger-ui-express";

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger); //Production level logger, gets logs in JSON
app.use(cookieParser());

//use swagger docs only in developement to test
if (process.env.NODE_ENV === "production") {
  app.use("/api-docs", (req, res) => {
    return res.status(404).send("Not available in production");
  });
} else {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { swaggerOptions: { withCredentials: true } }),
  );
}
app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

//Health route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// //test error handler
// app.get("/error-test", (req, res) => {
//   console.log("🔥 Route executed");
//   throw new AppError("This is a test error...", 400);
//   res.status(200).json({ message: "this is from error-test" });
// });

app.use("/auth", authRoutes);
app.use("/organization", orgRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found!",
  });
});

//Global error handler
app.use(errorHandler);

export { app };
