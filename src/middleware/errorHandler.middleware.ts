import { Response, Request, NextFunction } from "express";
import { AppError } from "../utils/AppError.ts";
import { logger } from "../infrastructure/logger.ts";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message =
    err instanceof AppError ? err.message : "Internal Server Error";

  logger.error({err},"Unhandled error");

  res.status(statusCode).json({
    status: statusCode,
    message,
  });
};
