// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/user.js';
import recipeRoutes from './routes/recipe.js';
import favoriteRoutes from './routes/favorite.js';
import noteRoutes from './routes/note.js';
import sharedRecipeRoutes from './routes/sharedrecipe.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/users', userRoutes); 
app.use('/api/recipes', recipeRoutes); 
app.use('/api/favorites', favoriteRoutes); 
app.use('/api/notes', noteRoutes);
app.use('/api/shared-recipes', sharedRecipeRoutes);

app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});

