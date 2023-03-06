const express = require('express');
const router = express.Router();

const { favoritesController } = require('../controllers');

router.get('/', favoritesController.getAllCharacters);
router.get('/:id', favoritesController.getCharacterById);
router.post('/', favoritesController.postCharacter);
router.delete('/:id', favoritesController.deleteCharacter);

module.exports = router;