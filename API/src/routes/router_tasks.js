const { Router } = require('express')
const router = Router();

const {Create} = require('../controller/controller_user');

router.post('/store/Create', Create);

module.exports = router;