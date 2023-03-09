const bcrypt = require('bcryptjs');
const User = require('../models/index').userModels;
const jwt = require('../utils/jwt');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan credenciales' });
  }

  try {
    // Buscar al usuario por su email
    const user = await User.findOne({ where: { email } });

    // Si el usuario no existe, devolver un error
    if (!user) {
      return res.status(401).json({ error: 'Email inválido' });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const passwordIsValid = await bcrypt.compare(password.trim(), user.password.trim());

    // Si la contraseña no coincide, devolver un error
    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Contraseña inválida' });
    }

    // Generar un token JWT y enviarlo como respuesta
    const token = jwt.generateToken({ id: user.id, email: user.email });
    res.json({ "token": token, "userId": user.id });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Faltan credenciales' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'El email ya está en uso' });
    }

    // Cifrar la contraseña
    const saltRounds = 10; // Cambia esto a tu preferencia
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Crear un nuevo usuario
    const newUser = await User.create({ email, password: hashedPassword, username });

    // Generar un token JWT y enviarlo como respuesta
    const token = jwt.generateToken({ id: newUser.id, email: newUser.email });
    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, register };
