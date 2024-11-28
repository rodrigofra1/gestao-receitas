// routes/recipe.js
import express from 'express';
import { createRecipe, listRecipes, updateRecipe, deleteRecipe } from '../controllers/recipe.js';

const router = express.Router();

// Criar uma receita
router.post('/create', createRecipe);

// Listar todas as receitas
router.get('/list', listRecipes);

// Atualizar uma receita
router.put('/:id', updateRecipe);

// Deletar uma receita
router.delete('/:id', deleteRecipe);

export default router;
