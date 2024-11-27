const userRouter = require('express').Router();
const controller = require('../controllers/user');

// CRUD para usuários
userRouter.get('/', controller.getAll); // Listar todos os usuários
userRouter.get('/:id', controller.getById); // Obter usuário por ID
userRouter.post('/create', controller.create); // Criar novo usuário
userRouter.put('/update', controller.update); // Atualizar usuário
userRouter.delete('/delete/:id', controller.delete); // Deletar usuário

module.exports = userRouter;