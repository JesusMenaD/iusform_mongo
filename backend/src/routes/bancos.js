const { Router } = require('express');
const { getBancos } = require('../controllers/Bancos.Controller.js');

const router = Router();

router.get('/', getBancos);

module.exports = router;
