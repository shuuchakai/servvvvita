import express from 'express';
import { analyzeImage } from '../controllers/image.controller.js';

const router = express.Router();

router.post('/analizar-imagen', analyzeImage);

export default router;
