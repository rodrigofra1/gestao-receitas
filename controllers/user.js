import bcrypt from 'bcryptjs';
import prisma from '../prismaClient.js';

// Registo de utilizador
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email já em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json({ success: true, message: 'Utilizador criado com sucesso!', data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao criar o utilizador.', details: error.message });
  }
};

// Login de utilizador
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Utilizador não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Senha incorreta.' });
    }

    res.status(200).json({ success: true, message: 'Login bem-sucedido', data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao fazer login.', details: error.message });
  }
};

// Listar utilizadores
export const listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao listar os utilizadores.', details: error.message });
  }
};

// Atualizar utilizador
export const updateUsers = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const data = { username, email };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      data.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data,
    });

    res.status(200).json({ success: true, message: 'Utilizador atualizado com sucesso!', data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar o utilizador.', details: error.message });
  }
};

// Apagar utilizador
export const deleteUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ success: false, message: 'ID inválido. Deve ser um número inteiro.' });
    }

    console.log(`Apagando registos relacionados ao utilizador com ID: ${parsedId}`);

    // Apagar todas as notas associadas ao utilizador
    await prisma.note.deleteMany({
      where: { userId: parsedId },
    });

    // Apagar o utilizador
    await prisma.user.delete({
      where: { id: parsedId },
    });

    res.status(200).json({ success: true, message: 'Utilizador apagado com sucesso.' });
  } catch (error) {
    console.error('Erro ao apagar o utilizador:', error);
    res.status(500).json({ success: false, message: 'Erro ao apagar o utilizador.', details: error.message });
  }
};

