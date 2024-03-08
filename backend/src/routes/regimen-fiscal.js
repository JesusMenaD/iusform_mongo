import { Router } from 'express';
import { getRegimenFiscal } from '../controllers/Regimen.Fiscal.Controller.js';
const router = Router();

router.get('/', getRegimenFiscal);

export default router;
