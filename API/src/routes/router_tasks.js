const { Router } = require('express')
const router = Router();

const {taskCreate} = require('../controller/controller_tasks');

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

module.exports = router;