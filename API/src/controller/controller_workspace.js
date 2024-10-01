const connection = require('../config/db');




// PÁGINA HOME
async function createWorkspace(request, response ){
    const params = Array(
        request.body.workspaceName,
        request.body.user_id,
        request.body.conteudo
    );
    console.log(params);
    const query = "INSERT INTO workspaces_table(nome,user_id,conteudo) VALUES(?,?,'.')"

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


// PÁGINA HOME
async function showWorkspace(request, response) {
    const params = Array (
        request.body.user_id
    );

    console.log(params);
    const query = "SELECT * FROM workspaces_table WHERE user_id = ?"
    console.log("é aqui q to")
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



// PÁGINA WORKSPACE
async function getContentWorkspace(request, response) {
    const params = Array (
        request.params.id
    )

    const query =  "SELECT conteudo FROM workspaces_table WHERE id = ?"

    connection.query(query, params, (err, results) => {
        if (err) {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                })
        } else if (results.length === 0) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Nenhum conteúdo encontrado",
                    data: []
                })
        } else {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        }
        
    })
}


// PÁGINA WORKSPACE
async function updateContent(request, response) {
    const params = Array (
        request.body.conteudo,
        request.body.id
    )

    const query = 'UPDATE workspaces_table SET conteudo = ? WHERE id = ?'

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                params: params,
                data: results
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Ops, deu problema",
                data: err
            })
        }
    })
}


// PÁGINA HOME
async function deleteWorkspace(request, response) {
    const params = Array (
        request.params.id
    )

    const query = 'DELETE FROM workspaces_table WHERE id = ?'

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                params: params,
                data: results
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Ops, deu problema",
                data: err
            })
        }
    })
}


// PÁGINA HOME
async function editName(request, response) {
   

    const params = Array(
        request.body.newname,
        request.body.id
    );

    console.log("eita")
 
    const query = 'UPDATE workspaces_table SET nome = ? WHERE id = ?';

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                params: params,
                data: results
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Ops, deu problema",
                data: err
            })
        }
    });
}

module.exports = {
    createWorkspace,
    showWorkspace,
    getContentWorkspace,
    updateContent,
    deleteWorkspace,
    editName
}