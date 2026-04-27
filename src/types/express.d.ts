import { Role } from "../modules/users/user.model.ts";

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
      organizationId?: string;
      orgRole?: Role;
    };
  }
}
