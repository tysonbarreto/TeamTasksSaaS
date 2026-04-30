import { AppError } from "../../utils/AppError.ts";
import { MembershipRepository } from "../memebership/membership.repository.ts";
import { Role } from "../users/user.model.ts";
import { UserReposiroty } from "../users/user.repository.ts";
import { OrganizationRepository } from "./organization.repository.ts";

export const OrganizationService = {
  createOrganization: async (name: string, ownerId: string) => {
    const org = await OrganizationRepository.create({ name, ownerId });
    await MembershipRepository.addUser(ownerId, org.id, "owner");
    return org;
  },
  listOrganizationUsers: async (organizationId: string) => {
    return MembershipRepository.findUser(organizationId);
  },
  invitUser: async (organizationId: string, email: string, role: Role) => {
    const user = await UserReposiroty.findByEmail(email);
    if (!user) throw new AppError("User not found", 400);
    const existing = await MembershipRepository.findMembership(
      user.id,
      organizationId,
    );

    if (existing) throw new AppError("User already in organization", 400);
    return await MembershipRepository.addUser(
      user.id.toString(),
      organizationId,
      role,
    );
  },
  changeRole: async (organizationId: string, userId: string, role: Role) => {
    return await MembershipRepository.updateRole(userId, organizationId, role);
  },
  removeUser: async (organizationId: string, userId: string) => {
    return await MembershipRepository.removeUser(userId, organizationId);
  },
};
