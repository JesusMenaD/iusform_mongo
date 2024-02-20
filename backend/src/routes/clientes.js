import { Router } from 'express';
import { getClientes, createCliente } from '../controllers/Clientes.Controller.js';

const router = Router();

router.get('/:despacho', getClientes);

router.post('/:despacho', createCliente);

export default router;
