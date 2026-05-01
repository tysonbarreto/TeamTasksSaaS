import { TaskReportsitory } from "./task.repository";

export class TaskService {
  static async createTask(data: any, user: any) {
    return TaskReportsitory.create({
      ...data,
      organizationid: user.organizationid,
      createdBy: user.createdBy,
    });
  }
  static async listTasks(orgId: string, page: number, limit: number) {
    const [tasks, total] = await TaskReportsitory.findPaginated(
      orgId,
      page,
      limit,
    );
    return { tasks, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  static async updateTask(id: string, data: any) {
    return await TaskReportsitory.update(id, data);
  }
  static async deleteTask(id: string) {
    return await TaskReportsitory.delete(id);
  }
  static async listFilteredTasks(
    orgId: string,
    filters: any,
    page: number,
    limit: number,
  ) {
    const [tasks, total] = await TaskReportsitory.findFiltered(
      orgId,
      filters,
      page,
      limit,
    );
    return { tasks, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
