const { Router } = require('express');
const { createOrder, pagoFind } = require('../controllers/pagos-conekta.js');

const router = Router();

router.post('/', createOrder);
router.get('/find', pagoFind);

module.exports = router;
