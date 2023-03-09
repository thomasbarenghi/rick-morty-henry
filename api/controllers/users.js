const users = require('../models/index').userModels;

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const user = await users.findAll();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = req.headers.userid;

  try {
    const user = await users.findByPk(id);

if(user.id != userId) {
      return res.status(401).json({ message: "You are not authorized to see this user" });
    }

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = req.headers.userid;

  try {
    const customCharacter = await users.findByPk(id);

if(customCharacter.id != userId) {
      return res.status(401).json({ message: "You are not authorized to delete this user" });
    }

    if (!customCharacter) {
      return res.status(404).json({ message: `Custom character with id ${id} not found` });
    }
    await customCharacter.destroy();
    res.status(204).json({ message: `Custom character with id ${id} deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting custom character" });
  }
};


module.exports = { getAllUsers, getUserById, deleteUser };