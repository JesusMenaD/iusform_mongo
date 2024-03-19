const { Router } = require('express');
const { login, register, rememberPassword } = require('../controllers/Usuarios.Controller.js');

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/remember', rememberPassword);

module.exports = router;
