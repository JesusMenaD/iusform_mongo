import { Router } from 'express';
import { getTipoUsuarios } from '../controllers/TipoUsuario.Controller.js';

const router = Router();

router.get('/:despacho/sin-paginar', getTipoUsuarios);

export default router;
