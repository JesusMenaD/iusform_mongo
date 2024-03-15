import { Router } from 'express';
import { getIngresos, createIngresos, getExpedientesSinPaginar, getClientes, deleteIngresos } from '../controllers/Ingresos.Controller.js';

const router = Router();

router.get('/:despacho', getIngresos);
router.post('/:despacho', createIngresos);
router.get('/expedientes/:despacho', getExpedientesSinPaginar);
router.get('/clientes/:despacho', getClientes);
router.delete('/:id', deleteIngresos);

export default router;
