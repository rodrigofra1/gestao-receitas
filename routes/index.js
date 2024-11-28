import express from 'express';
import userRoutes from './user.js';
import recipeRoutes from './recipe.js';
import favoriteRoutes from './favorite.js';
import noteRoutes from './note.js';
import sharedRecipeRoutes from './sharedrecipe.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/notes', noteRoutes);
router.use('/sharedRecipes', sharedRecipeRoutes);

export default router;