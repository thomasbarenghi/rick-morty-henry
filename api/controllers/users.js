const users = require('../data/data').users;


// Obtener todos los usuarios
function getAllUsers(req, res) {
  res.json(users);
}

// Obtener un usuario por ID
function getUserById(req, res) {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
}

// Agregar un nuevo usuario
function createUser(req, res) {
  const { name, age } = req.body;
  const id = users.length + 1;

  if (!name || !age) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const newUser = { id, name, age };
  users.push(newUser);
  res.status(201).json(newUser);
}

//Borrar un usuario
function deleteUser(req, res) {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(200).json({ message: 'Usuario eliminado' });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
}

// Actualizar un usuario
function updateUser(req, res) {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  const { name, age } = req.body;

  if (!name && !age) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  if (user) {
    user.name = name;
    user.age = age;
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
}

module.exports = { getAllUsers, getUserById, createUser, deleteUser, updateUser };