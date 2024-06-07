import { Router } from 'express';

import { updateConsumption, getConsumption } from '../controllers/consumption.controller.js';

const router = Router();

router.post('/update', updateConsumption);
router.get('/get', getConsumption);

export default router;
