import { Router } from 'express';
import {
  createExpediente,
  getExpedientesByUsuario,
  getExpedienteById,
  updateEstatus,
  updateTitulo,
  updateNumeroExpediente,
  updateJuicio,
  updateEtapaProcesal
} from '../controllers/Expedientes.Controller.js';
const router = Router();

// Ruta base común para el despacho y usuario
router.post('/:despacho', createExpediente);
router.get('/:despacho/:usuario', getExpedientesByUsuario);

// Ruta para obtener un expediente por ID
router.get('/:despacho/:usuario/:expediente', getExpedienteById);
// Rutas para actualizar diferentes campos de un expediente
router.patch('/:despacho/:usuario/:expediente/estatus', updateEstatus);
router.patch('/:despacho/:usuario/:expediente/titulo', updateTitulo);
router.patch('/:despacho/:usuario/:expediente/numero', updateNumeroExpediente);
router.patch('/:despacho/:usuario/:expediente/juicio', updateJuicio);
router.patch('/:despacho/:usuario/:expediente/etapa', updateEtapaProcesal);

export default router;
