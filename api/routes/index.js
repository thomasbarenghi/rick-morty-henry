const express = require('express');
const router = express.Router();
const charactersRoutes = require('./characters');
const userCharactersRoutes = require('./favorites');
const usersRoutes = require('./users');
//const customCharactersRoutes = require('./custom');
const authRoutes = require('./auth');

// Ruta principal
router.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a mi API' });
});

//Otras rutas
router.use("/characters", charactersRoutes);
//router.use("/custom", customCharactersRoutes);
router.use("/client/favorites", userCharactersRoutes);
router.use("/users", usersRoutes);
router.use("/auth", authRoutes);


module.exports = router;