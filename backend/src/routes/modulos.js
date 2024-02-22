import { Router } from 'express';
import { getModulos } from '../controllers/Modulos.Controller.js';

const router = Router();

router.get('/:usuario', getModulos);

export default router;
