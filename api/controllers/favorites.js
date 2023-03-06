const characters = require('../data/data.js').favorites;

function getAllCharacters(req, res) {
    res.json(characters);
}

// Obtener un usuario por ID
function getCharacterById(req, res) {
    const id = parseInt(req.params.id);
    const user = characters.find((user) => user.id === id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
}

function postCharacter(req, res) {

    const { id, name, status, gender, species, image } = req.body;

    if (!id || !name || !status || !gender || !species || !image) {
        res.status(400).json({ message: 'Faltan datos' });
        return;
    }
    characters.push(req.body);
    res.json(characters);
}

function deleteCharacter(req, res) {
    const id = parseInt(req.params.id);
    const user = characters.find((user) => user.id === id);

    if (user) {
        const index = characters.indexOf(user);
        characters.splice(index, 1);
        res.status(200).json({ message: 'Usuario eliminado' });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
}

module.exports = {
    getAllCharacters,
    getCharacterById,
    postCharacter,
    deleteCharacter
};