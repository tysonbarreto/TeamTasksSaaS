import { MembershipRepository } from "../memebership/membership.repository.ts";
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
};
