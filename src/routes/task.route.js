const express = require('express');
const validate = require('../middlewares/validate');
const taskValidation = require('../validations/task.validation');
const taskController = require('../controllers/task.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/createTask')
  .post(auth('getUsers'), validate(taskValidation.createTask), taskController.createTask);
  
router
  .route('/listTask')
  .get(auth('getUsers'), validate(taskValidation.listTask), taskController.listTask);

router
  .route('/completedTask')
  .get(auth('getUsers'), validate(taskValidation.completedTask), taskController.completedTask);

module.exports = router

/**
 * @swagger
 * tags:
 *   name: tasks
 *   description: Creating Tasks and information retrieva
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a task
 *     description: users and admins can create tasks.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - token
 *               role:
 *                  type: string
 *                  enum: [user, admin]
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all tasks
 *     description: users and admins can retrieve all users.
 *     tags: [tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         token: token
 *         schema:
 *           type: string
 *         description: User name
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */




