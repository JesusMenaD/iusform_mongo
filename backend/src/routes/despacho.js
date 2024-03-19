const { Router } = require('express');
const { ConfiguracionesDespacho, actualizarDespacho } = require('../controllers/Despacho.Controller.js');
const { configureMulterMixed } = require('../config/configureMulter.js');

const archivos = configureMulterMixed('despachos', ['logo', 'certificado', 'llave']);

const router = Router();

router.get('/:despacho', ConfiguracionesDespacho);
router.put('/:despacho', archivos, actualizarDespacho);

module.exports = router;
