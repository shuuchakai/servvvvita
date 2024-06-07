// routes/exerciseRoutes.js
import { Router } from 'express';
import { createExercises, getExercises, getExerciseById, updateExercise, deleteExercise } from '../controllers/exercise.controller.js';

const router = Router();

router.post('/exercises', createExercises);
router.get('/exercises', getExercises);
router.get('/exercises/:id', getExerciseById);
router.put('/exercises/:id', updateExercise);
router.delete('/exercises/:id', deleteExercise);

export default router;
