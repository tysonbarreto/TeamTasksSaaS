import { Schema, model, Types } from "mongoose";
export enum taskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

const TaskSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    status: { type: String, enum: taskStatus, default: taskStatus.TODO },
    organizationId: {
      type: Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    assignedTo: { type: Types.ObjectId, ref: "User" },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const TaskModel = model("Task", TaskSchema);
