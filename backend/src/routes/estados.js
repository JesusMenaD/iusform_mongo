import { Router } from 'express';
import { getEstados } from '../controllers/Estados.Controller.js';

const router = Router();

router.get('/', getEstados);

export default router;
