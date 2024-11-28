import express from 'express';
import { registerUser, loginUser, listUsers, updateUsers, deleteUsers} from '../controllers/user.js';  

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/list', listUsers);  

router.put('/:id', updateUsers);

router.delete('/:id', deleteUsers);

export default router;

