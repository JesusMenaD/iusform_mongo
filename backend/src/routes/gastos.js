import { Router } from 'express';
import { getGastos, createGastos, deleteGasto, getGasto, updateGasto } from '..//controllers/Gastos.Controller.js';
import { configureMulterArray } from '../config/configureMulter.js';
const upload = configureMulterArray('documentos', 'gastos');

const router = Router();

router.get('/:despacho', getGastos);
router.post('/:despacho', upload, createGastos);
router.delete('/:id', deleteGasto);
router.get('/:id/by-id', getGasto);
router.patch('/:id', updateGasto);

export default router;
