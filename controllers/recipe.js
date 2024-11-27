const fs = require('fs');

// Ler todas as receitas
exports.getAll = async (req, res) => {
  const datajson = fs.readFileSync("data/local/data.json", "utf-8");
  const data = JSON.parse(datajson);
  return res.send(data.recipes);
}

// Buscar receita por ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  const datajson = fs.readFileSync("data/local/data.json", "utf-8");
  const data = JSON.parse(datajson);
  const recipe = data.recipes.find(recipe => recipe.id == id);
  if (recipe) {
    return res.send(recipe);
  } else {
    return res.status(404).send("Receita não encontrada.");
  }
}

// Criar nova receita
exports.create = async (req, res) => {
  const { title, category, description } = req.body;
  const datajson = fs.readFileSync("data/local/data.json", "utf-8");
  const data = JSON.parse(datajson);
  const newRecipe = {
    id: data.recipes.length + 1, // Gerar um ID simples (poderia ser mais robusto)
    title,
    category,
    description,
    created_at: new Date().toISOString()
  };
  data.recipes.push(newRecipe);
  fs.writeFileSync("data/local/data.json", JSON.stringify(data));
  return res.status(201).send(newRecipe);
}

// Atualizar receita
exports.update = async (req, res) => {
  const { id, title, category, description } = req.body;
  const datajson = fs.readFileSync("data/local/data.json", "utf-8");
  const data = JSON.parse(datajson);
  const recipe = data.recipes.find(recipe => recipe.id == id);
  
  if (recipe) {
    recipe.title = title;
    recipe.category = category;
    recipe.description = description;
    fs.writeFileSync("data/local/data.json", JSON.stringify(data));
    return res.send(recipe);
  } else {
    return res.status(404).send("Receita não encontrada.");
  }
}

// Excluir receita
exports.delete = async (req, res) => {
  const id = req.params.id;
  const datajson = fs.readFileSync("data/local/data.json", "utf-8");
  const data = JSON.parse(datajson);
  const index = data.recipes.findIndex(recipe => recipe.id == id);
  
  if (index !== -1) {
    data.recipes.splice(index, 1);
    fs.writeFileSync("data/local/data.json", JSON.stringify(data));
    return res.status(200).send("Receita deletada.");
  } else {
    return res.status(404).send("Receita não encontrada.");
  }
}