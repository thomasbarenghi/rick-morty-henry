const usersController = require('./users');
const favoritesController = require('./favorites');
const defaultCharactersController = require('./default');
const authController = require('./auth');

module.exports = {
  favoritesController,
  usersController,
  defaultCharactersController,
  authController,
};