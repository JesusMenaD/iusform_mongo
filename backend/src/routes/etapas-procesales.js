const { Router } = require('express');
const { getEtapasProcesales, getEtapasProcesalesSinPagina } = require('../controllers/EtapasProcesales.Controller.js');

const router = Router();

router.get('/', getEtapasProcesales);
router.get('/sin-pagina', getEtapasProcesalesSinPagina);

// router.post('/:despacho', createCliente);
module.exports = router;
