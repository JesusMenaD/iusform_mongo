const { Router } = require('express');
const { getMovimientos, getUsuariosExpedientesAsignados, getCargo, getAbono, getBalance, getCancelados, getPendientes, getMateriasExpedientes, getExpedientesEstatus, getExpedientesSinMovimientos30Dias, getExpedientesMovimientos } = require('../controllers//Dash.Controller.js');

const router = Router();

router.get('/movimientos', getMovimientos);
router.get('/usuarios-expedientes-asignados', getUsuariosExpedientesAsignados);
router.get('/cargo', getCargo);
router.get('/abono', getAbono);
router.get('/balance', getBalance);
router.get('/cancelados', getCancelados);
router.get('/pendientes', getPendientes);
router.get('/materias-expedientes', getMateriasExpedientes);
router.get('/expedientes-estatus', getExpedientesEstatus);
router.get('/expedientes-activos-sin-movimientos', getExpedientesSinMovimientos30Dias);
router.get('/expedientes-movimientos', getExpedientesMovimientos);

module.exports = router;
