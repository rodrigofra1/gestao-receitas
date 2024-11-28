import express from 'express';
import { addNote } from '../controllers/note.js'; 

const router = express.Router();

router.post('/note',  addNote);

export default router;
