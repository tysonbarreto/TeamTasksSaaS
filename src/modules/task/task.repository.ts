import { TaskModel } from "./task.model.ts";

export class TaskReportsitory {
  static async create(data: any) {
    return await TaskModel.create(data);
  }
  static async findPaginated(
    organizationId: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;
    return Promise.all([
      TaskModel.find({ organizationId }).skip(skip).limit(limit).lean(),
      TaskModel.countDocuments({ organizationId }),
    ]);
  }
  static async findById(id: string) {
    return await TaskModel.findById(id);
  }
  static async update(id: string, data: any) {
    return await TaskModel.findByIdAndUpdate(id, data, { new: true });
  }
  static async delete(id: string) {
    return await TaskModel.findByIdAndDelete(id);
  }
  static async findFiltered(
    orgId: string,
    filters: any,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;
    const query: any = { organizationId: orgId };
    if (filters.status) query.status = filters.status;
    if (filters.assignedTo) query.assignedTo = filters.assignedTo;
    if (typeof filters.search === "string")
      query.title = { $regex: filters.search, $options: "i" };

    return await Promise.all([
      TaskModel.find(query).skip(skip).limit(limit).lean(),
      TaskModel.countDocuments(query),
    ]);
  }
}
