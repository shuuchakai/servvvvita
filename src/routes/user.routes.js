import {Router} from 'express';

import { register, login, getUserProfile } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/profile', authenticate, getUserProfile);
router.post('/register', register);
router.post('/login', login);
// router.post('/confirm', confirmEmail);

export default router;
