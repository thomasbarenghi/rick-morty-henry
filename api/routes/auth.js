const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const { authController } = require('../controllers');

// Ruta de autenticación
router.post('/', authController.login);
router.post("/register", authController.register);

router.get('/me', authMiddleware, (req, res) => {
    res.json({ message: 'Token válido', id: req.user.id});
});


module.exports = router;
