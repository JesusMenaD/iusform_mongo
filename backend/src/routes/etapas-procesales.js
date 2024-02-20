import { Router } from 'express';
import { getEtapasProcesales } from '../controllers/EtapasProcesales.Controller.js';

const router = Router();

router.get('/', getEtapasProcesales);

// router.post('/:despacho', createCliente);

export default router;
