const { Router } = require('express');
const { getMovimientosExpediente } = require('../controllers/Expedientes.Movimientos.Controller.js');

const router = Router();

router.get('/:despacho/:expediente', getMovimientosExpediente);

module.exports = router;
