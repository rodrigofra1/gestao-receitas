// routes/note.js
import express from 'express';
import { addNote } from '../controllers/note.js'; // Importando a função corretamente

const router = express.Router();

// Rota para adicionar uma nota
router.post('/note',  addNote);

export default router;
