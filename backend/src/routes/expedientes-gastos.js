import { Router } from 'express';
import { create, get, deleteGasto, balance } from '../controllers/Expedientes.Gastos.Controller.js';
import { configureMulterSingle } from '../config/configureMulter.js';
const router = Router();
const upload = configureMulterSingle('comprobante', '/expedientes-gastos');

router.post('/:despacho/:usuario/:expediente', upload, create);
router.get('/:despacho/:expediente', get);
router.delete('/:id', deleteGasto);
router.get('/balance/:despacho/:expediente', balance);

export default router;
