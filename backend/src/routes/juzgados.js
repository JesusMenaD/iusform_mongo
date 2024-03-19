const { Router } = require('express');
const { getJuzgados } = require('../controllers/Juzgados.Controller.js');

const router = Router();

router.get('/', getJuzgados);

// router.post('/:despacho', createCliente);

module.exports = router;
