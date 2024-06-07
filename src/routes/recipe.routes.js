import { Router } from 'express';

import { generateRecipe } from '../controllers/recipe.controller.js';

const router = Router();

router.post('/generate', generateRecipe);

export default router;