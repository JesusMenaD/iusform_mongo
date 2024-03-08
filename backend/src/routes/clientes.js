import { Router } from 'express';
import { getClientes, createCliente, getCliente, updateCliente, deleteCliente } from '../controllers/Clientes.Controller.js';

const router = Router();

router.get('/:despacho', getClientes);
router.get('/:despacho/:id', getCliente);
router.patch('/:despacho/:id', updateCliente);
router.post('/:despacho', createCliente);
router.delete('/:id', deleteCliente);

export default router;
