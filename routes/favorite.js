import express from 'express';
import { addFavorite } from '../controllers/favorite.js';

const router = express.Router();

// Adicionar aos favoritos
router.post('/favorite', addFavorite);

export default router;
