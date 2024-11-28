import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para adicionar uma nota
export const addNote = async (req, res) => {
  const { recipeId, content, userId } = req.body; 

  // Verifica se  os parâmetros foram fornecidos
  if (!recipeId || !content || !userId) {
    return res.status(400).json({ error: 'Falta o recipeId, conteúdo ou userId.' });
  }

  try {
    // Verifica se a receita e o utilizador existem na base de dados
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Se a receita ou o urilizador não forem encontrados, return erro
    if (!recipe) {
      return res.status(404).json({ error: 'Receita não encontrada.' });
    }

    if (!user) {
      return res.status(404).json({ error: 'urilizador não encontrado.' });
    }

    // Cria a nota e associá-la ao recipeId e ao userId diretamente
    const createdNote = await prisma.note.create({
      data: {
        content, 
        recipeId, 
        userId, 
      },
    });

    res.status(201).json({ message: 'Nota adicionada com sucesso', note: createdNote });
  } catch (error) {
    console.error('Erro ao adicionar a nota:', error); // Detalhes do erro para debug
    res.status(500).json({ error: 'Erro ao adicionar a nota', details: error.message });
  }
};
