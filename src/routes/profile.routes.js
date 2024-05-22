import { Router } from 'express';

import { createProfile, getProfiles } from '../controllers/profile.controller.js';

const router = Router();

router.post('/create', createProfile);
router.post('/get', getProfiles);

export default router;