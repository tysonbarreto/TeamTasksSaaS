import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AuthService.register(req.body);
      // Set refresh token cookie
      res.cookie("refreshToken", result.refreshToken, cookieOptions);
      res.status(201).json({
        user: result.user,
        organization: result.organization,
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      // Set refresh token cookie
      res.cookie("refreshToken", result.refreshToken, cookieOptions);
      res.status(201).json({
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  },
  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, refreshToken } = req.body;
      const result = await AuthService.refresh(user.id, refreshToken);
      // Set refresh token cookie
      res.cookie("refreshToken", result.newRefreshTokens, cookieOptions);
      res.json({
        user: result.user,
        accessToken: result.newAccessTokens,
      });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      await AuthService.logout(userId.id);

      //Clear cookie
      res.clearCookie("refreshToken", cookieOptions);
      res.json({ message: "Logged out" });
    } catch (error) {
      next(error);
    }
  },
  listUsers: async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await AuthService.listUsers(page, limit);
    return res.status(200).json(result);
  },
};
