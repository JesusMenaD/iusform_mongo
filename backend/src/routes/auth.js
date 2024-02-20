import { Router } from 'express';
import { login, register, rememberPassword } from '../controllers/Usuarios.Controller.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/remember', rememberPassword);

export default router;
