import { Router } from 'express';
import { getGastosTramites } from '../controllers/Gastos.Tramites.js';

const router = Router();

router.get('/:despacho', getGastosTramites);

export default router;
