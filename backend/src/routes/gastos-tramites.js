const { Router } = require('express');
const { getGastosTramites } = require('../controllers/Gastos.Tramites.js');

const router = Router();

router.get('/:despacho', getGastosTramites);

module.exports = router;
