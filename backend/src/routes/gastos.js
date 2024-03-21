const { Router } = require('express');
const { getGastos, createGastos, deleteGasto, getGasto, updateGasto, deleteComprobante } = require('..//controllers/Gastos.Controller.js');
const { configureMulterArray } = require('../config/configureMulter.js');
const upload = configureMulterArray('comprobantes', 'gastos');

const router = Router();

router.get('/:despacho', getGastos);
router.post('/:despacho', upload, createGastos);
router.delete('/:id', deleteGasto);
router.get('/:id/by-id', getGasto);
router.patch('/:id', upload, updateGasto);
router.delete('/comprobante/:id', deleteComprobante);

module.exports = router;
