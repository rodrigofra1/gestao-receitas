exports.getAll = async (req, res) => {
    return res.send("Todos os utilizadores");
};

exports.getById = async (req, res) => {
    const id = req.params.id;
    return res.send('Utilizador com ID: ${id}');
};

exports.create = async (req, res) => {
    const { name, email, password } = req.body;
    return res.status(201).send(req.body);
};

exports.update = async (req, res) => {
    const { id, name, email, password } = req.body;
    return res.send(req.body);
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    return res.send('Utilizador com ID: ${id} apagado');
};
 