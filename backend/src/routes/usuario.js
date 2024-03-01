import { Router } from 'express';
import { actualizarUsuario, obtenerUsuarios } from '../controllers/Usuarios.Controller.js';
import { configureMulterSingle } from '../config/configureMulter.js';

const router = Router();
const upload = configureMulterSingle('foto', '/usuarios');

router.put('/:id', upload, actualizarUsuario);
router.get('/:despacho', obtenerUsuarios);

export default router;
