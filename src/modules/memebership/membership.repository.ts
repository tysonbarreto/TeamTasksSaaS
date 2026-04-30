import { Role } from "../users/user.model";
import { MembershipModel } from "./membership.model";

export const MembershipRepository = {
  addUser: async (userId: string, organizationId: string, role: string) => {
    return await MembershipModel.create({ userId, organizationId, role });
  },
  findUser: async (organizationId: string) => {
    return await MembershipModel.findOne({ organizationId: organizationId });
  },
  findMembership: async (userId: string, organizationId: string) => {
    return await MembershipModel.findOne({ userId, organizationId });
  },
  updateRole: async (userId: string, organizationId: string, role: Role) => {
    return await MembershipModel.findOneAndUpdate(
      { userId, organizationId }, //filter
      { role }, //update
      { new: true }, //options
    );
  },
  removeUser: async (userId: string, organizationId: string) => {
    return await MembershipModel.findOneAndDelete({ userId, organizationId });
  },
};
