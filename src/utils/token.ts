import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//tokens must refresh every 15mins
export const generateAccessToken = (userId: String) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15d",
  });
};

//lets leave the refreshing every 7d
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};
export const hashToken = async (token: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(token, salt);
};
export const compareToken = async (token: string, hashedToken: string) => {
  return bcrypt.compare(token, hashedToken);
};
