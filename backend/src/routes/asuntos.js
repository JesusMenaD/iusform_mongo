const { Router } = require('express');
const { getAsuntos, createAsuntos } = require('../controllers/Asuntos.Controller.js');

const router = Router();

router.get('/:despacho', getAsuntos);

router.post('/:despacho', createAsuntos);

module.exports = router;
