// routes/user.js
import express from 'express';
import { registerUser, loginUser, listUsers, updateUsers, deleteUsers} from '../controllers/user.js';  // Certifique-se de importar as funções corretamente

const router = express.Router();

// Rota para criar um usuário
router.post('/register', registerUser);

// Rota para fazer login de um usuário
router.post('/login', loginUser);

// Rota para listar todos os usuários
router.get('/list', listUsers);  // A rota para listar todos os usuários é "/api/users"

//atualizar
router.put('/:id', updateUsers);

//delete
router.delete('/:id', deleteUsers);

// Exportando as rotas
export default router;

