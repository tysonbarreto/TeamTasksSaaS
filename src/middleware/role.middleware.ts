import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) throw new AppError("Unauthorized", 401);
    if (!allowedRoles.includes(user.role)) throw new AppError("Forbidden", 403);
    next();
  };
};
