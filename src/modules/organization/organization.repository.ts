import { OrganizationModel } from "./organization.model";

export const OrganizationRepository = {
  create: async (data: any) => {
    return await OrganizationModel.create(data);
  },
  findById: async (id: string) => {
    return await OrganizationModel.findById(id);
  },
};
