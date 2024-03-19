const { Router } = require('express');
const { getEstados } = require('../controllers/Estados.Controller.js');

const router = Router();

router.get('/', getEstados);

module.exports = router;
