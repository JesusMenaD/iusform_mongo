import { Router } from 'express';
import { actualizarUsuario } from '../controllers/Usuarios.Controller.js';
import configureMulter from '../config/configureMulter.js';

const router = Router();
const upload = configureMulter('foto', '/usuarios');

router.put('/:id', upload, actualizarUsuario);

export default router;
