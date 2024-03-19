const { Router } = require('express');
const { getDeclaracionFiscal, creteDeclaracionFiscal, deleteDeclaracionFiscal, getDeclaracionFiscalById, updateDeclaracionFiscal } = require('../controllers/Declaraciones.Fiscales.Controller.js');
const { configureMulterSingle } = require('../config/configureMulter.js');

const router = Router();
const upload = configureMulterSingle('archivo', '/declaraciones-fiscales');

router.get('/:despacho', getDeclaracionFiscal);
router.post('/:despacho', upload, creteDeclaracionFiscal);
router.delete('/:id', deleteDeclaracionFiscal);
router.get('/:id/by-id', getDeclaracionFiscalById);
router.patch('/:id', upload, updateDeclaracionFiscal);

module.exports = router;
