const { DataTypes } = require('sequelize');
const sequelize = require('../data/connection');

const User = require('./users');
const DefaultCharacter = require('./defaultCharacter');

const Favorite = sequelize.define('favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  defaultCharacterId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'default_characters',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});

Favorite.belongsTo(User);
Favorite.belongsTo(DefaultCharacter);

module.exports = Favorite;
