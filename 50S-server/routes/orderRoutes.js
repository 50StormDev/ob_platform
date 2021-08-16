import { Router } from 'express';
const router = Router();
import { create } from '../handlers/brookers.js';

router.post("/:brooker_name/:account_id/:day/add", create);

export default router;