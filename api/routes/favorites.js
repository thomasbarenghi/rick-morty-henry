const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const { favoritesController } = require('../controllers');

router.get('/',authMiddleware, favoritesController.getFavorites);
//router.get('/:userId/:id', favoritesController.getFavoriteById);
router.post('/',authMiddleware, favoritesController.addFavorite);
router.delete('/:id',authMiddleware, favoritesController.deleteFavorite);

module.exports = router;