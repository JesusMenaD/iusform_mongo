const { Router } = require('express');
const {
  getUsuarios,
  deleteUsuarioExpediente,
  getUsuarioExpedienteSinAsignar,
  createUsuariosExpediente,
  getUsuariosExpedienteSinPaginar
} = require('../controllers/Expedientes.Usuarios.js');
const router = Router();

// Ruta base común para el despacho y usuario
router.get('/:despacho/:expediente', getUsuarios);
router.post('/:despacho/:expediente', createUsuariosExpediente);
router.get('/:despacho/:expediente/sin-asignar', getUsuarioExpedienteSinAsignar);
router.delete('/:_id', deleteUsuarioExpediente);
router.get('/:despacho/:expediente/sin-paginar', getUsuariosExpedienteSinPaginar);

module.exports = router;
