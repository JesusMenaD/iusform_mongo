import { Router } from 'express';
import { ConfiguracionesDespacho, actualizarDespacho } from '../controllers/Despacho.Controller.js';
import { configureMulterMixed } from '../config/configureMulter.js';

const archivos = configureMulterMixed('despachos', ['logo', 'certificado', 'llave']);

const router = Router();

router.get('/:despacho', ConfiguracionesDespacho);
router.put('/:despacho', archivos, actualizarDespacho);

export default router;
