import { Router } from 'express';
import { getDocumetnos, createDocumentos, deleteDocumento } from '../controllers/Expedientes.Documentos.js';
import { configureMulterArray } from '../config/configureMulter.js';

const router = Router();
const upload = configureMulterArray('documentos', '/documentos');

router.get('/:despacho/:expediente', getDocumetnos);

router.post('/:despacho/:usuario/:expediente', upload, createDocumentos);

router.delete('/:_id', deleteDocumento);

export default router;
