const express = require('express');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipe');

const app = express();
const port = 4242;

app.use(bodyParser.json()); 

app.use('/api/recipes', recipeRoutes);

app.listen(port, () => {
  console.log('Servidor em http://localhost:${port}');
});