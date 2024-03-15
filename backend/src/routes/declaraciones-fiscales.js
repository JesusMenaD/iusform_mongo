import { Router } from 'express';
import { getDeclaracionFiscal, creteDeclaracionFiscal, deleteDeclaracionFiscal, getDeclaracionFiscalById, updateDeclaracionFiscal } from '../controllers/Declaraciones.Fiscales.Controller.js';
import { configureMulterSingle } from '../config/configureMulter.js';

const router = Router();
const upload = configureMulterSingle('archivo', '/declaraciones-fiscales');

router.get('/:despacho', getDeclaracionFiscal);
router.post('/:despacho', upload, creteDeclaracionFiscal);
router.delete('/:id', deleteDeclaracionFiscal);
router.get('/:id/by-id', getDeclaracionFiscalById);
router.patch('/:id', upload, updateDeclaracionFiscal);

export default router;
