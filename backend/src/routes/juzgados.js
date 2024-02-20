import { Router } from 'express';
import { getJuzgados } from '../controllers/Juzgados.Controller.js';

const router = Router();

router.get('/', getJuzgados);

// router.post('/:despacho', createCliente);

export default router;
