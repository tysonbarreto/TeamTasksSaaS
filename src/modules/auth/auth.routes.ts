import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "./auth.middleware";
import { requireRole } from "../../middleware/role.middleware";

const router = Router();

/**
 * @openapi
 * /auth/register:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Register a new user
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: User created
 */
router.post("/register", AuthController.register);
/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful
 *       401:
 *        description: Unauthorized
 */
router.post(
  "/login",
  //requireRole("owner", "admin", "member"),
  AuthController.login,
);

/**
 * @openapi
 * /auth/refresh:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Refresh access token
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *       description: New access token returned
 */
router.post(
  "/refresh",
  authMiddleware,
  requireRole("owner", "admin", "member"),
  AuthController.refresh,
);

/**
 * @openapi
 * /auth/logout:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Logout user and clear refresh token
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Logged out
 */
router.post(
  "/logout",
  authMiddleware,
  requireRole("owner", "admin", "member"),
  AuthController.logout,
);

/**
 * @openapi
 * /auth/users:
 *  get:
 *    tags:
 *      - Admin
 *    summary: List of users in organization
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: Page number
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: Items per page
 *    responses:
 *      200:
 *        description: List of users
 *      403:
 *        description: Forbidden - requires admin or owner role
 */
router.get(
  "/users",
  authMiddleware,
  //requireRole("admin", "owner"),
  AuthController.listUsers, //to implement
);

export default router;
