const { Router } = require('express')
const router = Router();

const {taskCreate,getTask} = require('../controller/controller_tasks');

/**
 * @swagger
 * /store/create:
 *   get:
 *     summary: Cria as tarefas
 *     responses:
 *       200:
 *         description: Cria as tarefas no banco de dados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.post('/store/taskCreate', taskCreate);

/**
 * @swagger
 * /getTask:
 *   get:
 *     summary: Busca as tarefas
 *     responses:
 *       200:
 *         description: Busca as tarefas que estão relacionadas ao usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.post('/getTask', getTask)

module.exports = router;