const connection = require('../config/db');

async function taskCreate(request, response) {
    let params = Array (
        request.body.nome,
        request.body.conteudo,
        request.body.end_date,
        request.body.user_id,
        request.body.tipo
    )

    let query = "INSERT INTO tasks_table(nome,conteudo,end_date,user_id,tipo,status) VALUES(?,?,?,?,?,'open')"

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Task created successfully",
                data: results
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Error creating task",
                data: err
            })
        }
    })
}

async function getTask(request, response) {
    let params = Array (
        request.body.user_id
    )

    let query = "SELECT * FROM tasks_table WHERE user_id = ?"

    connection.query(query, params, (err, results) => {
        console.log(err, results)
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                })
        }
    })
}


async function closeTask(request, response) {
    let params = Array (
        request.body.status,
        request.body.id
    )

    let query = "UPDATE tasks_table SET status = ? WHERE id = ?"

    connection.query(query, params, (err, results) => {
        console.log(err, results)
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                })
        }
    })
}

async function editTask(request, response) {
    let params = [
        request.body.conteudo,
        request.body.end_date,
        request.body.id
    ];

    let query = "UPDATE tasks_table SET conteudo = ?, end_date = ? WHERE id = ?"

    connection.query(query, params, (err, results) => {
        console.log(err, results)
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                })
        }
    })
}

async function deleteTask(request, response) {

    let params = Array (
        request.params.id
    )

    let query = ('DELETE FROM tasks_table WHERE id = ?')

    connection.query(query, params, (err, results) => {
        console.log(err, results)
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                })
        }
    })
}

module.exports = {
    taskCreate,
    getTask,
    closeTask,
    deleteTask,
    editTask
}