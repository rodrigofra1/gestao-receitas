// controllers/favorite.js
import prisma from '../prismaClient.js';

export const addFavorite = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    // Verificar se os dados foram enviados corretamente
    if (!userId || !recipeId) {
      return res.status(400).json({ error: 'Faltando dados: userId ou recipeId.' });
    }

    // Verificar se a receita e o usuário existem no banco de dados
    const recipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!recipe || !user) {
      return res.status(404).json({ error: 'Receita ou usuário não encontrado.' });
    }

    // Verificar se o favorito já existe (com a combinação userId e recipeId)
    const existingFavorite = await prisma.favorite.findFirst({
      where: { 
        userId: userId,
        recipeId: recipeId 
      }
    });

    if (existingFavorite) {
      return res.status(400).json({ error: 'Receita já adicionada aos favoritos.' });
    }

    // Adicionar ao banco de dados
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        recipeId,
      },
    });

    res.status(201).json(favorite); // Retorna o favorito criado
  } catch (error) {
    console.error('Erro ao adicionar aos favoritos:', error); // Verifica o erro no console
    res.status(500).json({ error: 'Erro ao adicionar aos favoritos.', details: error.message });
  }
};
