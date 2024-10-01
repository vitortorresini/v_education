const express = require('express');
const router = express.Router();
const { editName, createWorkspace, showWorkspace, getContentWorkspace, updateContent, deleteWorkspace } = require('../controller/controller_workspace');

router.patch('/store/editName', editName); // A rota para editar o nome do workspace
router.post('/store/workspace', createWorkspace);
router.post('/store/showWorkspace', showWorkspace);
router.get('/store/getContentWorkspace/:id', getContentWorkspace);
router.put('/store/updateContent', updateContent);
router.delete('/store/deleteWorkspace/:id', deleteWorkspace);

module.exports = router;