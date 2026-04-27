import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { NextFunction } from "express";

export type Role = "owner" | "admin" | "member";

export interface IUser extends Document {
  email: string;
  password: string; //make this a hashed password later
  name: string;
  role: Role;
  organizationId?: string;

  refreshTokenHash?: string;
  refreshTokenExpiresAt?: Date;

  comparePassword(password: string): Promise<boolean>; //hook to authenticate user
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["owner", "admin", "member"],
      default: "member",
    },
    refreshTokenHash: { type: String },
    refreshTokenExpiresAt: { type: Date },
    organizationId: { type: String },
  },
  { timestamps: true },
);

/**
 * 🔒 Pre hooks to hash password before storing in the DB
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * 🔒 Compare password hook
 */
userSchema.methods.comparePassword = async function (
  user: string,
): Promise<boolean> {
  return await bcrypt.compare(user, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
