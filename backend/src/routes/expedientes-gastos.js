const { Router } = require('express');
const { create, get, deleteGasto, balance } = require('../controllers/Expedientes.Gastos.Controller.js');
const { configureMulterSingle } = require('../config/configureMulter.js');
const router = Router();
const upload = configureMulterSingle('comprobante', '/expedientes-gastos');

router.post('/:despacho/:usuario/:expediente', upload, create);
router.get('/:despacho/:expediente', get);
router.delete('/:id', deleteGasto);
router.get('/balance/:despacho/:expediente', balance);

module.exports = router;
