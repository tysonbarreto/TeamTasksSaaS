import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware";
import { OrganizationController } from "./organization.controller";

const router = Router();

/**
 * @openapi
 * /organizations:
 *  post:
 *      tags:
 *          - Organization
 *      summary: Create a new organization
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Acme Inc"
 *      responses:
 *          201:
 *              description: New organization has been created
 *          401:
 *              description: Unauthorized - missing or invalid token
 */
router.post("/", authMiddleware, OrganizationController.create);

/**
 * @openapi
 * /organization/users:
 *  get:
 *      tags:
 *          - Organization
 *      summary: List users in the current organization]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: List of users
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: User has no organization
 */
router.get("/users", authMiddleware, OrganizationController.listUsers);

export default router;
