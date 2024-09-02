const { Router } = require('express')
const router = Router();

const {Create, Login, editName, editCPF, editTelefone, editData, perfilPush} = require('../controller/controller_user');

router.post('/store/create', Create);
router.post('/store/login', Login)
router.put('/store/editName', editName);
router.put('/store/editCPF', editCPF);
router.put('/store/editTelefone', editTelefone);
router.put('/store/editData', editData);
router.get('/store/perfilPush/:id', perfilPush);




module.exports = router;