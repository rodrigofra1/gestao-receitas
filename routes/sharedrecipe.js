import express from 'express';
import { shareRecipe, getSharedRecipes } from '../controllers/sharedrecipe.js';  

const router = express.Router();

router.post('/shared', shareRecipe);

router.get('/shared', getSharedRecipes);

export default router;
