import { Router } from 'express';
import { getHistorialBancos, createMovimientoBanco, deleteMovimientoBanco, getMovimientoById, updateMovimientoBanco } from '..//controllers/Historial.Bancos.Controller.js';

const router = Router();

router.get('/:despacho', getHistorialBancos);
router.post('/:despacho', createMovimientoBanco);
router.delete('/:id', deleteMovimientoBanco);
router.get('/:id/by-id', getMovimientoById);
router.patch('/:id', updateMovimientoBanco);

export default router;
