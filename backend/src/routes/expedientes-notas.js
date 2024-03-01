import { Router } from 'express';
import { getNotas, createNotas, updateNotas, deleteNotas } from '../controllers/Expedientes.Notas.js';

const router = Router();

router.get('/:despacho/:expediente', getNotas);
router.post('/:despacho/:usuario/:expediente', createNotas);
router.patch('/:id', updateNotas);
router.delete('/:id', deleteNotas);

export default router;
