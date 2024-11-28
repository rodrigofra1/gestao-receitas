import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para adicionar uma nota
export const addNote = async (req, res) => {
  const { recipeId, content, userId } = req.body; // Esperando os dados de recipeId, content e userId

  // Verifique se todos os parâmetros necessários foram fornecidos
  if (!recipeId || !content || !userId) {
    return res.status(400).json({ error: 'Faltando recipeId, conteúdo ou userId.' });
  }

  try {
    // Verificando se a receita e o usuário existem no banco de dados
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Se a receita ou o usuário não forem encontrados, retornamos erro
    if (!recipe) {
      return res.status(404).json({ error: 'Receita não encontrada.' });
    }

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Criar a nota e associá-la ao recipeId e ao userId diretamente
    const createdNote = await prisma.note.create({
      data: {
        content, // O conteúdo da nota
        recipeId, // Associando a nota à receita
        userId, // Associando a nota ao usuário
      },
    });

    res.status(201).json({ message: 'Nota adicionada com sucesso', note: createdNote });
  } catch (error) {
    console.error('Erro ao adicionar a nota:', error); // Detalhes do erro para debug
    res.status(500).json({ error: 'Erro ao adicionar a nota', details: error.message });
  }
};
