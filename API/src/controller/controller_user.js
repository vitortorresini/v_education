const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function Create(request, response ){
    
    const params = Array(
        request.body.email,
        request.body.nome,
        request.body.senha
    );

    const query = "INSERT INTO users_table(email,nome,senha) VALUES(?,?,?)";

    connection.query(query, params, (err, results) => {
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
                    message: "Ops, deu problema",
                    data: err
                })
        }
    })
}

async function Login(request,response) {
    const params = [
        request.body.email,
        request.body.senha
    ];


    const query = "SELECT id, nome, email, senha FROM users_table WHERE email = ? AND senha = ?";

    connection.query(query, params, (err, results) => {
        if (results && results.length > 0) {
            response.status(200).json({
                success: true,
                message: "Sucesso no Login",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Problema no Login",
                data: err
            })
        }
    })  
}

async function editName(request, response) {
    const params = [
        request.body.nome,
        request.body.id
    ]

    const query = "UPDATE users_table SET nome = ? WHERE id = ?";

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

async function editCPF(request, response) {
    const params = [
        request.body.cpf,
        request.body.id
    ]

    const query = "UPDATE users_table SET cpf = ? WHERE id = ?";

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

async function editTelefone(request, response) {
    const params = [
        request.body.telefone,
        request.body.id
    ]

    const query = "UPDATE users_table SET telefone = ? WHERE id = ?";

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

async function editData(request, response) {
    const params = [
        request.body.nasc_data,
        request.body.id
    ]

    const query = "UPDATE users_table SET nasc_data = ? WHERE id = ?";

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

async function perfilPush(request, response) {
    const params = Array (
        // request.body.nome,
        // request.body.cpf,
        // request.body.telefone,
        // request.body.nasc_data,
        request.params.id
    )

    const query = "SELECT nome, cpf, telefone, nasc_data FROM users_table WHERE id = ?";

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


module.exports = {
    Create,
    Login,
    editName,
    editCPF,
    editTelefone,
    editData,
    perfilPush
}