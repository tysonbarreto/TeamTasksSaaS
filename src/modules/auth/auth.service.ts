import { UserReposiroty } from "../users/user.repository";
import {
  generateAccessToken,
  generateRefreshToken,
  compareToken,
  hashToken,
} from "../../utils/token";
import { AppError } from "../../utils/AppError";
import { OrganizationService } from "../organization/organization.service";

export const AuthService = {
  /**
   * Register a new user
   */
  register: async (data: { email: string; password: string; name: string, organizationName:string }) => {
    //check if the user exists, if not raise 400
    const existing = await UserReposiroty.findByEmail(data.email);
    if (existing) throw new AppError("Email already in use", 400);

    const user = await UserReposiroty.create(data);

    //Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    //Password will get hashed with the prehook of the User Model
    //Hash refresh tokens before saving
    const refreshHashedToken = await hashToken(refreshToken);

    await UserReposiroty.updateRefreshToken(
      user.id,
      refreshHashedToken,
      new Date(Date.now() + 7 * 24 * 60 * 601000),
    );

    const org = await OrganizationService.createOrganization(
      data.organizationName,
      user.id,
    );

    return { user, organization: org, accessToken, refreshToken };
  },
  /**
   * User login
   */
  login: async (email: string, password: string) => {
    //check if user exists, else raise 401
    const user = await UserReposiroty.findByEmail(email);
    if (!user) throw new AppError("Invalid credentials", 401);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const refreshHashedToken = await hashToken(refreshToken);

    await UserReposiroty.updateRefreshToken(
      user.id,
      refreshHashedToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    return { user, accessToken, refreshToken };
  },

  /**
   * Refresh token or rotate tokens
   */
  refresh: async (userId: string, providedToken: string) => {
    //check if user exists, else raise 401
    const user = await UserReposiroty.findById(userId);
    if (!user) throw new AppError("Invalid credentials", 401);

    //Validate refresh tokens
    const isValid = await compareToken(providedToken, user.refreshTokenHash!);
    if (!isValid) throw new AppError("Invalid refresh token", 401);

    //Check expiry
    const isExpired =
      user.refreshTokenExpiresAt && user.refreshTokenExpiresAt < new Date();
    if (isExpired) throw new AppError("Refresh token expired", 401);

    //Rotate tokens
    const newAccessTokens = generateAccessToken(user.id);
    const newRefreshTokens = generateRefreshToken(user.id);

    const newRefreshHashedToken = await hashToken(newRefreshTokens);

    await UserReposiroty.updateRefreshToken(
      user.id,
      newRefreshHashedToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );
    return { user, newAccessTokens, newRefreshTokens };
  },

  /**
   * Logout
   */
  logout: async (userId: string) => {
    await UserReposiroty.updateRefreshToken(userId, undefined, undefined);
    return { message: "Logged out" };
  },

  listUsers: async (page: number, limit: number) => {
    return UserReposiroty.finAllPaginated(page, limit);
  },
};
