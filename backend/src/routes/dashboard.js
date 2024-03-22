const { Router } = require('express');
const { getMovimientos, getUsuariosExpedientesAsignados, getCargo, getAbono, getBalance, getCancelados, getPendientes } = require('../controllers//Dash.Controller.js');

const router = Router();

router.get('/movimientos', getMovimientos);
router.get('/usuarios-expedientes-asignados', getUsuariosExpedientesAsignados);
router.get('/cargo', getCargo);
router.get('/abono', getAbono);
router.get('/balance', getBalance);
router.get('/cancelados', getCancelados);
router.get('/pendientes', getPendientes);

module.exports = router;
