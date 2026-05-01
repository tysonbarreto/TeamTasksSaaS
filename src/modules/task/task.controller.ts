import { Request, Response } from "express";
import { TaskService } from "./task.service";

export class TaskController {
  static async create(req: Request, res: Response) {
    const task = await TaskService.createTask(req.body, (req as any).user);
    return res.status(201).json(task);
  }
  static async list(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await TaskService.listTasks(
      (req as any).user.organizationId,
      page,
      limit,
    );
  }
  static async listFilteredTasks(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const filters = {
      status: req.query.status,
      assignedTo: req.query.assignedTo,
      search: req.query.search,
    };

    const result = await TaskService.listFilteredTasks(
      (req as any).user.organizationId,
      filters,
      page,
      limit,
    );

    return res.status(200).json(result);
  }
  static async update(req: Request, res: Response) {
    const updated = await TaskService.updateTask(
      req.params.id as string,
      req.body,
    );
    return res.status(200).json(this.update);
  }
  static async remove(req: Request, res: Response) {
    await TaskService.deleteTask(req.params.id as string);
    return res.status(200).json({ message: "Task deleted" });
  }
}
