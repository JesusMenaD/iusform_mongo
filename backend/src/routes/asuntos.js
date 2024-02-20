import { Router } from 'express';
import { getAsuntos, createAsuntos } from '../controllers/Asuntos.Controller.js';

const router = Router();

router.get('/:despacho', getAsuntos);

router.post('/:despacho', createAsuntos);

export default router;
