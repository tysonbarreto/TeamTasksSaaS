import { Request, Response } from "express";
import { OrganizationService } from "./organization.service";
import { AppError } from "../../utils/AppError";

export const OrganizationController = {
  create: async (req: Request, res: Response) => {
    const { name } = req.body;
    const ownerId = (req as any).user?.organization.ownerId;

    if (!ownerId) throw new AppError("Owner ID required", 400);

    const org = await OrganizationService.createOrganization(name, ownerId);
    return res.status(201).json(org);
  },
  listUsers: async (req: Request, res: Response) => {
    const orgId = (req as any).user?.organizationId;
    console.log(orgId);
    if (!orgId) throw new AppError("Organization ID required", 400);
    const users = await OrganizationService.listOrganizationUsers(orgId);
    return res.status(200).json(users);
  },
};
