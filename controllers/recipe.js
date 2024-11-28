// controllers/recipe.js
import prisma from '../prismaClient.js';

// Criar uma receita
export const createRecipe = async (req, res) => {
  const { title, ingredients, instructions, category, userId } = req.body;

  try {
    const recipe = await prisma.recipe.create({
      data: {
        title,
        ingredients,
        instructions,
        category,
        userId
      }
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao criar a receita.' });
  }
};

// Listar todas as receitas
export const listRecipes = async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar as receitas.' });
  }
};

// Atualizar uma receita
export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions, category, userId } = req.body;

  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id: parseInt(id) },
      data: {
        title,
        ingredients,
        instructions,
        category,
        userId
      }
    });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a receita.' });
  }
};

// Deletar uma receita
export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.recipe.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json({ message: 'Receita deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar a receita.' });
  }
};
