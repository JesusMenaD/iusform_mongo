const { Router } = require('express');
const { getTipoUsuarios, getTipoUsuarioById } = require('../controllers/Tipos.Usuarios.Despacho.Controller.js');

const router = Router();

router.get('/:despacho', getTipoUsuarios);
router.get('/:_id/by-id', getTipoUsuarioById);

module.exports = router;
