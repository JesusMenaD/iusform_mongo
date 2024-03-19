const { Router } = require('express');
const { getModulos } = require('../controllers/Modulos.Controller.js');

const router = Router();

router.get('/:usuario', getModulos);

module.exports = router;
