import { Router } from 'express';
import { actualizarUsuario, obtenerUsuarios, createUsuarioDespacho, obtenerUsuario, updateUsuario, deleteUsuario } from '../controllers/Usuarios.Controller.js';
import { configureMulterSingle } from '../config/configureMulter.js';

const router = Router();
const upload = configureMulterSingle('foto', '/usuarios');

router.put('/:id', upload, actualizarUsuario);
router.get('/:despacho', obtenerUsuarios);
router.post('/:despacho', createUsuarioDespacho);
router.get('/:id/by-id', obtenerUsuario);
router.patch('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;
