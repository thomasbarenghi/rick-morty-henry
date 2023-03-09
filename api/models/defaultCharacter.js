const { DataTypes } = require('sequelize');
const sequelize = require('../data/connection');
const User = require('./users'); // Importar el modelo de User
const Favorite = require('./favorites'); // Importar el modelo de Favorite

const DefaultCharacter = sequelize.define('default_characters', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(20)
  },
  species: {
    type: DataTypes.STRING(20)
  },
  type: {
    type: DataTypes.STRING(50)
  },
  gender: {
    type: DataTypes.STRING(10)
  },
  origin_name: {
    type: DataTypes.STRING(50)
  },
  location_name: {
    type: DataTypes.STRING(50)
  },
  image: {
    type: DataTypes.STRING(100)
  },
});

// Establecer la relación con el modelo de User
DefaultCharacter.belongsTo(User, { foreignKey: 'author', onDelete: 'CASCADE' });
User.hasMany(DefaultCharacter, { foreignKey: 'author', onDelete: 'CASCADE' });
//DefaultCharacter.hasMany(Favorite, { foreignKey: 'default_character_id' });

module.exports = DefaultCharacter;
