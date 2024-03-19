const { Router } = require('express');
const { getTipoUsuarios } = require('../controllers/TipoUsuario.Controller.js');

const router = Router();

router.get('/:despacho/sin-paginar', getTipoUsuarios);

module.exports = router;
