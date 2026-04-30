import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware";
import { OrganizationController } from "./organization.controller";
import { requireRole } from "../../middleware/role.middleware";

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
 *                      required:
 *                          - name
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Acme Inc"
 *      responses:
 *          201:
 *              description: New organization has been created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                              name:
 *                                  type: string
 *                              ownerId:
 *                                  type: string
 *                              createdAt:
 *                                  type: string
 *                              updatedAt:
 *                                  type: string
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  userId:
 *                                      type: string
 *                                  role:
 *                                      type: string
 *                                      enum: [owner,admin,member]
 *                                  createdAt:
 *                                      type: string
 *                                  updatedAt:
 *                                      type: string
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: User has no organization
 */
router.get("/users", authMiddleware, OrganizationController.listUsers);

/**
 * @openapi
 * /organization/invite:
 *  post:
 *      tags:
 *          - Organization
 *      summary: Invite a user to the organization
 *      security:
 *          - brearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - role
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: "user@example.com"
 *                          role:
 *                              type: string
 *                              enum: [admin, member]
 *                              example: "member"
 *         responses:
 *            201:
 *              description: User added to origanization
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                          userId:
 *                              type: string
 *                          organization:
 *                              type: string
 *                          role:
 *                              type: string
 *            400:
 *              description: User already in organization
 *            404:
 *              description: User not found
 *            401:
 *              description: Unauthorised
 *
 */
router.post(
  "/invite",
  authMiddleware,
  requireRole("owner", "admin"),
  OrganizationController.invite,
);
/**
 * @openapi
 * /organization/role:
 *  patch:
 *      tags:
 *          - Organization
 *      summary: Change a user's role in the organization
 *      security:
 *          - brearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - userId
 *                          - role
 *                      properties:
 *                          userId:
 *                              type: string
 *                              example: "65a123bgs123..."
 *                          role:
 *                              type: string
 *                              enum: [owner, admin, member]
 *                              example: "admin"
 *         responses:
 *            201:
 *              description: Role updated successfully
 *            404:
 *              description: Member not found
 *            401:
 *              description: Unauthorised
 */
router.patch(
  "/role",
  authMiddleware,
  requireRole("owner"),
  OrganizationController.changeRole,
);
/**
 * @openapi
 * /organization/users/{userId}:
 *  delete:
 *      tags:
 *          - Organization
 *      summary: Change a user's role in the organization
 *      security:
 *          - brearerAuth: []
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          schema:
 *            type: string
 *          description: ID of the user to remove
 *      responses:
 *        200:
 *          description: User removed successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User removed"
 *        404:
 *          description: Membership not found
 *        401:
 *          description: Unauthorized
 */
router.delete(
  "/users/:userId",
  authMiddleware,
  requireRole("owner", "admin"),
  OrganizationController.changeRole,
);
export default router;
