import { Router } from 'express';
import { createPartes, getPartes, deletePartes, updatePartes } from '../controllers/Expedientes.Partes.Controller.js';

const router = Router();

router.post('/:despacho/:expediente', createPartes);
router.get('/:despacho/:expediente', getPartes);
router.delete('/:_id', deletePartes);
router.patch('/:_id', updatePartes);

export default router;
