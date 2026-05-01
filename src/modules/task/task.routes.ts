import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware";
import {
  canAssignTask,
  canModifyTask,
} from "../../middleware/task-rbac.middleware";
import { TaskController } from "./task.controller";

const router = Router();

/**
 * @openapi
 * /tasks:
 *  post:
 *      tags: [Tasks]
 *      summary: Create a new task in the user's organization
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - title
 *                      properties:
 *                          title:
 *                              type: string
 *                              example: "Fix login bug"
 *                          description:
 *                              type: string
 *                              example: "Users cannot login with Google Oauth"
 *                          assignedTo:
 *                              type: string
 *                              example: "654asc354..."
 *      responses:
 *          200:
 *              description: Task created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                              title:
 *                                  type: string
 *                              description:
 *                                  type: string
 *                              status:
 *                                  type: string
 *                                  enum: [todo, in-progress, done]
 *                              assignedTo:
 *                                  type: string
 *                              organizationId:
 *                                  type: string
 *                              createdBy:
 *                                  type: string
 *                              createdAt:
 *                                  type: string
 *                              updatedAt:
 *                                  type: string
 *          401:
 *              description: Unauthorized
 */
router.post("/", authMiddleware, TaskController.create);

/**
 * @openapi
 * /tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get paginated list of tasks for the user's organization
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: Paginated list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [todo, in-progress, done]
 *                       assignedTo:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                 total:
 *                   type: number
 *                 page:
 *                   type: number
 *                 limit:
 *                   type: number
 *                 totalPages:
 *                   type: number
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, TaskController.list);

/**
 * @openapi
 * /tasks:
 *  post:
 *      tags: [Tasks]
 *      summary: Create a new task in the user's organization
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - title
 *                      properties:
 *                          title:
 *                              type: string
 *                              example: "Fix login bug"
 *                          description:
 *                              type: string
 *                              example: "Users cannot login with Google Oauth"
 *                          assignedTo:
 *                              type: string
 *                              example: "654asc354..."
 *      responses:
 *          200:
 *              description: Task created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                              title:
 *                                  type: string
 *                              description:
 *                                  type: string
 *                              status:
 *                                  type: string
 *                                  enum: [todo, in-progress, done]
 *                              assignedTo:
 *                                  type: string
 *                              organizationId:
 *                                  type: string
 *                              createdBy:
 *                                  type: string
 *                              createdAt:
 *                                  type: string
 *                              updatedAt:
 *                                  type: string
 *          401:
 *              description: Unauthorized
 */
router.post("/", authMiddleware, TaskController.create);

/**
 * @openapi
 * /tasks/filtered:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get paginated list of filtered tasks for the user's organization
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [todo,in-progress,done]
 *       - in: query
 *         name: assignedTo
 *         schema:
 *           type: string
 *         example: "345abc765..."
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: "login"
 *     responses:
 *       200:
 *         description: Paginated list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [todo, in-progress, done]
 *                       assignedTo:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                 total:
 *                   type: number
 *                 page:
 *                   type: number
 *                 limit:
 *                   type: number
 *                 totalPages:
 *                   type: number
 *       401:
 *         description: Unauthorized
 */
router.get("/filtered", authMiddleware, TaskController.listFilteredTasks);

/**
 * @openapi
 * /tasks/{id}:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Update a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, done]
 *               assignedTo:
 *                 type: string
 *           examples:
 *             memberSelfAssign:
 *               summary: Member assigning task to themselves
 *               value:
 *                 assignedTo: "USER_ID"
 *             adminAssign:
 *               summary: Admin assigning task to another user
 *               value:
 *                 assignedTo: "OTHER_USER_ID"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - user cannot assign or reassign this task
 */
router.patch(
  "/:id",
  authMiddleware,
  canAssignTask,
  canModifyTask,
  TaskController.update,
);

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Update a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      description:
 *                          type: string
 *                      status:
 *                          type: string
 *                          enum: [todo,in-progress,done]
 *                      assignedTo:
 *                          type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: "Task deleted"
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authMiddleware, canModifyTask, TaskController.remove);

export default router;
