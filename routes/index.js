const router = require('express').Router();
const recipeRouter = require('./recipe');
const userRouter = require('./user');

// Registrar rotas
router.use('/recipes', recipeRouter);
router.use('/users', userRouter);

module.exports = router;