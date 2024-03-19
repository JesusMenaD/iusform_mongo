const { Router } = require('express');
const { getMaterias } = require('../controllers/Materias.Controller.js');

const router = Router();

router.get('/', getMaterias);

module.exports = router;
