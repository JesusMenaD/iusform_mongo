const { Router } = require('express');
const { getRecursosIncidenciasMateria } = require('../controllers/Recursos.Incidencias.Controller.js');

const router = Router();

router.get('/:materia', getRecursosIncidenciasMateria);

module.exports = router;
