const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const { defaultCharactersController } = require('../controllers');

router.get('/', authMiddleware, defaultCharactersController.getCharacters);
router.get('/:id',authMiddleware,  defaultCharactersController.getCharactersById);
router.post('/', authMiddleware, defaultCharactersController.addCharacter);
router.delete('/:id', authMiddleware, defaultCharactersController.deleteCharacter);

module.exports = router;