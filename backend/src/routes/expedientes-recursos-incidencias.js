const { Router } = require('express');
const { getRecursosIncidencias } = require('../controllers/Expedientes.Incidencias.Controller.js');

const router = Router();

router.get('/:despacho/:expediente', getRecursosIncidencias);

module.exports = router;
