import { Router } from 'express';
import { getRecursosIncidencias } from '../controllers/Expedientes.Incidencias.Controller.js';

const router = Router();

router.get('/:despacho/:expediente', getRecursosIncidencias);

export default router;
