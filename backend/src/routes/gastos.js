const { Router } = require('express');
const { getGastos, createGastos, deleteGasto, getGasto, updateGasto } = require('..//controllers/Gastos.Controller.js');
const { configureMulterArray } = require('../config/configureMulter.js');
const upload = configureMulterArray('documentos', 'gastos');

const router = Router();

router.get('/:despacho', getGastos);
router.post('/:despacho', upload, createGastos);
router.delete('/:id', deleteGasto);
router.get('/:id/by-id', getGasto);
router.patch('/:id', updateGasto);

module.exports = router;
