import { MembershipModel } from "./membership.model";

export const MembershipRepository = {
  addUser: async (userId: string, organizationId: string, role: string) => {
    return await MembershipModel.create({ userId, organizationId, role });
  },
  findUser: async (organizationId: string) => {
    return await MembershipModel.findOne({organizationId:organizationId});
  },
};
