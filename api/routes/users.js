const express = require('express');
const router = express.Router();

const { usersController } = require('../controllers');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.delete('/:id', usersController.deleteUser);


module.exports = router;