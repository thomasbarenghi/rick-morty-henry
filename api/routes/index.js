const express = require('express');
const router = express.Router();
const charactersRoutes = require('./characters');
const userCharactersRoutes = require('./userCharacters');

// Ruta principal
router.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a mi API' });
});

//Otras rutas
router.use("/characters", charactersRoutes);
router.use("/userCharacters", userCharactersRoutes);


module.exports = router;