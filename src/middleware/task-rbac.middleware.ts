import { Request, Response, NextFunction } from "express";
import { TaskModel } from "../modules/task/task.model";

//this middleware is only to restrict updatation and deletion of tasks to ownes and admins

export const canModifyTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = (req as any).user;
  const taskId = req.params.id;

  const task = await TaskModel.findById(taskId);

  if (!task) return res.status(404).json({ message: "Task not found" });

  //Only owners and admins can modify
  if (["owner", "admin"].includes(user.orgRole)) {
    (req as any).task = task;
    return next();
  }

  //Members can modify their own tasks
  const isCreator = task.createdBy.toString() === user.id;
  const isAssignee = task.assignedTo?.toString() === user.id;

  if (isCreator || isAssignee) {
    (req as any).task = task;
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
};

export const canAssignTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = (req as any).user;
  const taskId = req.params.id;
  const { assignedTo } = req.body;

  const task = await TaskModel.findById(user.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  //Owners/Admins can assign tasks
  if (["owner", "admin"].includes(user.orgRole)) {
    (res as any).task = task;
    return next();
  }

  //Members can only assign tasks to themselves
  if (assignedTo && assignedTo! == user.id)
    return res
      .status(403)
      .json({ message: "Members can only assign tasks to themselves" });
  //Members cannot reassign tasks created by others
  const isCreator = task.createdAt.toString() === user.id;
  const isAssignee = task.assignedTo?.toString() === user.id;

  if (!isCreator && !isAssignee)
    return res.status(403).json({
      message:
        "Members cannot reassign tasks they do not own or are not assigned to",
    });
  (req as any).task = task;
  return next();
};
