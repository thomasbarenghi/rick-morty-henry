const characters = require('../data/data.js').characters;

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

  module.exports = {  
    getAllCharacters,
    getCharacterById
  };