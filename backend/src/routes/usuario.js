const { Router } = require('express');
const { actualizarUsuario, obtenerUsuarios, createUsuarioDespacho, obtenerUsuario, updateUsuario, deleteUsuario } = require('../controllers/Usuarios.Controller.js');
const { configureMulterSingle } = require('../config/configureMulter.js');

const router = Router();
const upload = configureMulterSingle('foto', '/usuarios');

router.put('/:id', upload, actualizarUsuario);
router.get('/:despacho', obtenerUsuarios);
router.post('/:despacho', createUsuarioDespacho);
router.get('/:id/by-id', obtenerUsuario);
router.patch('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;
