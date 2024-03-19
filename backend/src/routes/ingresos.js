const { Router } = require('express');
const { getIngresos, createIngresos, getExpedientesSinPaginar, getClientes, deleteIngresos } = require('../controllers/Ingresos.Controller.js');

const router = Router();

router.get('/:despacho', getIngresos);
router.post('/:despacho', createIngresos);
router.get('/expedientes/:despacho', getExpedientesSinPaginar);
router.get('/clientes/:despacho', getClientes);
router.delete('/:id', deleteIngresos);

module.exports = router;
