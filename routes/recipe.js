import express from 'express';
import { createRecipe, listRecipes, updateRecipe, deleteRecipe } from '../controllers/recipe.js';

const router = express.Router();

router.post('/create', createRecipe);

router.get('/list', listRecipes);

router.put('/:id', updateRecipe);

router.delete('/:id', deleteRecipe);

export default router;
