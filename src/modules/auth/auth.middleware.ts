import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserReposiroty } from "../users/user.repository";
import { AppError } from "../../utils/AppError";

import { MembershipModel } from "../memebership/membership.model";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //check of bearer token in headers exists
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith("Bearer "))
      throw new AppError("Unauthorized", 401);

    //else get the token
    const token = authHeaders.split(" ")[1];

    if (!token) throw new AppError("Unauthorized", 401);
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as { userId: string }; //because the payload has the userId and its a string

    const user = await UserReposiroty.findById(decodedToken.userId);
    //check if user exists
    if (!user) throw new AppError("Unauthorized", 401);

    // console.log("Decoded", decodedToken);
    // console.log("User", user);

    //fetch membership(org+role)
    const memebership = await MembershipModel.findOne({
      userId: user.id,
    });
    if (!memebership) {
      return res.status(403).json({ message: "User has no organization" });
    }

    //Attach user to request
    (req as any).user = {
      id: user.id,
      email: user.email,
      role: user.role,
      organizationId: memebership.organizationId.toString(),
      orgRole: memebership.role,
    };

    next();
  } catch (error) {
    console.log(error);
    next(new AppError("Unauthorized", 401));
  }
};
