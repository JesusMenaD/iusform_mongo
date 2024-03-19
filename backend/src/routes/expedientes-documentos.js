const { Router } = require('express');
const { getDocumetnos, createDocumentos, deleteDocumento } = require('../controllers/Expedientes.Documentos.js');
const { configureMulterArray } = require('../config/configureMulter.js');
const upload = configureMulterArray('documentos', '/documentos');

const router = Router();

router.get('/:despacho/:expediente', getDocumetnos);

router.post('/:despacho/:usuario/:expediente', upload, createDocumentos);

router.delete('/:_id', deleteDocumento);

module.exports = router;
