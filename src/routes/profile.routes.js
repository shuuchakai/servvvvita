import { Router } from 'express';

import { createProfile, getProfile } from '../controllers/profile.controller.js';

const router = Router();

router.post('/create', createProfile);
router.post('/get', getProfile)

export default router;