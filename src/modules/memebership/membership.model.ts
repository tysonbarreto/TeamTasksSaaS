import { Schema, model, Types } from "mongoose";

const MembershipSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    organizationId: {
      type: Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "admin", "member"],
      default: "member",
    },
  },
  {
    timestamps: true,
  },
);
export const MembershipModel = model("Membership", MembershipSchema);
