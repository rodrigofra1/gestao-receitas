import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const shareRecipe = async (req, res) => {
  const { recipeId, sharedWithId } = req.body;
  const userId = req.userId; 

  if (!userId) {
    return res.status(401).json({ message: 'utilizador não autenticado' });
  }

  if (!recipeId || !sharedWithId) {
    return res.status(400).json({ message: 'recipeId e sharedWithId são obrigatórios.' });
  }

  try {
    // Verificar se a receita existe
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }

    // Verificar se o utilizador existe
    const userToShare = await prisma.user.findUnique({
      where: { id: sharedWithId },
    });

    if (!userToShare) {
      return res.status(404).json({ message: 'Utilizador não encontrado' });
    }

    // Verificar se a receita já foi partilhada com o utilizador
    const existingShare = await prisma.sharedRecipe.findUnique({
      where: {
        recipeId_sharedWithId: { recipeId, sharedWithId },  
      },
    });

    if (existingShare) {
      return res.status(400).json({ message: 'Receita já partilhada com este utilizador' });
    }

    // Criar a partilha da receita
    const sharedRecipe = await prisma.sharedRecipe.create({
      data: {
        recipeId,       
        sharedWithId,   
        userId,         
      },
    });

    // Retornar a receita partilhada
    res.status(201).json(sharedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao partilhar receita' });
  }
};

// Endpoint para obter as receitas partilhadas com o utilizador
export const getSharedRecipes = async (req, res) => {
  const userId = req.userId;  

  try {
    // procura as receitas partilhadas com o utilizador
    const sharedRecipes = await prisma.sharedRecipe.findMany({
      where: {
        sharedWithId: userId,  
      },
      include: {
        recipe: true,  
        user: true,    
      },
    });

    // Return da lista de receitas partilhadas com o utilizador
    res.status(200).json(sharedRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar receitas partilhadas' });
  }
};
