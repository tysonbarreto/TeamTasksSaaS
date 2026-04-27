import { Schema, model, Types } from "mongoose";

const OrganizationSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerId: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const OrganizationModel = model("Organization", OrganizationSchema);
