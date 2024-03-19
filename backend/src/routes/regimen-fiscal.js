const { Router } = require('express');
const { getRegimenFiscal } = require('../controllers/Regimen.Fiscal.Controller.js');
const router = Router();

router.get('/', getRegimenFiscal);

module.exports = router;
