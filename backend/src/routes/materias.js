import { Router } from 'express';
import { getMaterias } from '../controllers/Materias.Controller.js';

const router = Router();

router.get('/', getMaterias);

export default router;
