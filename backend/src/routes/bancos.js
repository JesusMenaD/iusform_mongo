import { Router } from 'express';
import { getBancos } from '../controllers/Bancos.Controller.js';

const router = Router();

router.get('/', getBancos);

export default router;
