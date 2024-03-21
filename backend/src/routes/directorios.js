const { Router } = require('express');
const { getDirectorios } = require('../controllers/Directorios.Controller.js');

const router = Router();

router.get('/', getDirectorios);

module.exports = router;
