import { Router } from 'express';

import { createIngredient, deleteIngredient, getIngredient, getIngredients, updateIngredient } from '../controllers/ingredients.controller.js';
import isAdmin from '../middlewares/isAdmin.middleware.js';

const router = Router();

router.post('/create', isAdmin, createIngredient);
router.post('/getOne', getIngredient);
router.post('/update', isAdmin, updateIngredient);
router.post('/delete', isAdmin, deleteIngredient);

router.get('/get', getIngredients);

export default router;