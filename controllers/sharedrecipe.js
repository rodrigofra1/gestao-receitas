import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Endpoint para compartilhar uma receita
export const shareRecipe = async (req, res) => {
  const { recipeId, sharedWithId } = req.body;
  const userId = req.userId; // Certifique-se de que o ID do usuário está sendo extraído corretamente

  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
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

    // Verificar se o usuário com quem a receita será compartilhada existe
    const userToShare = await prisma.user.findUnique({
      where: { id: sharedWithId },
    });

    if (!userToShare) {
      return res.status(404).json({ message: 'Usuário para compartilhar não encontrado' });
    }

    // Verificar se a receita já foi compartilhada com esse usuário
    const existingShare = await prisma.sharedRecipe.findUnique({
      where: {
        recipeId_sharedWithId: { recipeId, sharedWithId },  // Verificar se já existe o compartilhamento
      },
    });

    if (existingShare) {
      return res.status(400).json({ message: 'Receita já compartilhada com este usuário' });
    }

    // Criar o compartilhamento da receita
    const sharedRecipe = await prisma.sharedRecipe.create({
      data: {
        recipeId,       // ID da receita que está sendo compartilhada
        sharedWithId,   // ID do usuário com quem a receita foi compartilhada
        userId,         // ID do usuário que está compartilhando
      },
    });

    // Retornar a receita compartilhada
    res.status(201).json(sharedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao compartilhar receita' });
  }
};

// Endpoint para obter as receitas compartilhadas com o usuário
export const getSharedRecipes = async (req, res) => {
  const userId = req.userId;  // Supondo que o ID do usuário logado esteja em req.userId

  try {
    // Buscando as receitas compartilhadas com o usuário
    const sharedRecipes = await prisma.sharedRecipe.findMany({
      where: {
        sharedWithId: userId,  // Receitas compartilhadas com este usuário
      },
      include: {
        recipe: true,  // Incluir detalhes da receita
        user: true,    // Incluir detalhes do usuário que compartilhou a receita
      },
    });

    // Retornar a lista de receitas compartilhadas com o usuário
    res.status(200).json(sharedRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter receitas compartilhadas' });
  }
};
