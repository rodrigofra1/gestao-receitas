import express from 'express';
import { shareRecipe, getSharedRecipes } from '../controllers/sharedrecipe.js';  // Importando ambas as funções

const router = express.Router();

// Rota para compartilhar uma receita
router.post('/shared', shareRecipe);

// Rota para obter as receitas compartilhadas com um usuário
router.get('/shared', getSharedRecipes);

export default router;
