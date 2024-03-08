import { Router } from 'express';
import { getTipoUsuarios, getTipoUsuarioById } from '../controllers/Tipos.Usuarios.Despacho.Controller.js';

const router = Router();

router.get('/:despacho', getTipoUsuarios);
router.get('/:_id/by-id', getTipoUsuarioById);

export default router;
