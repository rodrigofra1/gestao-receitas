const express = require('express');
const recipeController = require('../controllers/recipe');

const router = express.Router();

// Definir as rotas para as receitas
router.get('/', recipeController.getAll); // Listar todas as receitas
router.get('/:id', recipeController.getById); // Buscar uma receita por ID
router.post('/create', recipeController.create); // Criar uma nova receita
router.put('/update', recipeController.update); // Atualizar uma receita existente
router.delete('/delete/:id', recipeController.delete); // Deletar uma receita por ID

module.exports = router;