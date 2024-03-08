import { Router } from 'express';
import { getEtapasProcesales, getEtapasProcesalesSinPagina } from '../controllers/EtapasProcesales.Controller.js';

const router = Router();

router.get('/', getEtapasProcesales);
router.get('/sin-pagina', getEtapasProcesalesSinPagina);

// router.post('/:despacho', createCliente);

export default router;
