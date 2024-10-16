const connection = require('../config/db');

async function taskCreate(request, response) {
    const params = Array (
        request.body.nome,
        request.body.conteudo,
        request.body.end_date
    )

    const query = "INSERT INTO tasks_table(nome,conteudo,end_date,status) VALUES(?,?,?,'open')"

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

module.exports = {
    taskCreate
}