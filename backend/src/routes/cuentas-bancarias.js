import { Router } from 'express';
import { getCuentasBancarias, createCuentasBancarias, deleteCuentasBancarias, getById, updateCuentasBancarias, geyBancosSinPaginar } from '../controllers/Cuentas.Bancarias.Controller.js';

const router = Router();

router.get('/:despacho', getCuentasBancarias);
router.post('/:despacho', createCuentasBancarias);
router.delete('/:id', deleteCuentasBancarias);
router.get('/:id/by-id', getById);
router.patch('/:id', updateCuentasBancarias);
router.get('/:despacho/sin-paginar', geyBancosSinPaginar);

export default router;
