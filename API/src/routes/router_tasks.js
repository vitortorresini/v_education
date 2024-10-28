const { Router } = require('express')
const router = Router();

const {taskCreate,getTask,closeTask,deleteTask} = require('../controller/controller_tasks');

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


/**
 * @swagger
 * /closeTask:
 *   get:
 *     summary: Muda status para concluído
 *     responses:
 *       200:
 *         description: Muda o status da task no banco de dados para concluido, fechando a task.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.patch('/closeTask', closeTask)

/**
 * @swagger
 * /deleteTask:
 *   get:
 *     summary: Delete a task
 *     responses:
 *       200:
 *         description: Deleta a task selecionada no banco de dados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.delete('/deleteTask/:id', deleteTask)

module.exports = router;