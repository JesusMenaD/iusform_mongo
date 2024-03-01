import { Router } from 'express';
import { getMovimientosExpediente } from '../controllers/Expedientes.Movimientos.Controller.js';

const router = Router();

router.get('/:despacho/:expediente', getMovimientosExpediente);

export default router;
