
const DefaultCharacter = require('../models/index').defaultCharacterModels;
const { Op } = require("sequelize");
const jwt = require('../utils/jwt');

const getCharacters = async (req, res) => {
  const userId = req.user.id;
  const reqAuthor = req.query.author;
  //console.log("hola user",req.user)



  if (reqAuthor) {
    try {
      const defaultCharacter = await DefaultCharacter.findAll({
        where: {
          author: reqAuthor
        }
      });

      if (!defaultCharacter) {
        return res.status(404).json({ message: `Default character with id not found` });
      }

      if (userId != reqAuthor) {
        return res.status(401).json({ message: `You are not authorized to access this character ${userId}, ${reqAuthor}` });
      }

      return res.status(200).json({ "result": defaultCharacter });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: `Error retrieving default character` });
    }
  }


  try {
    const defaultCharacters = await DefaultCharacter.findAll({
      where: {
        [Op.or]: [
          { author: userId },
          { author: 1 }
        ]
      }
    });

    res.status(200).json({ "result": defaultCharacters });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: `Error retrieving default character` });
  }
};


const getCharactersById = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const defaultCharacter = await DefaultCharacter.findByPk(id);

    if (!defaultCharacter) {
      return res.status(404).json({ message: `Default character with id ${id} not found` });
    }

    if (defaultCharacter.author != userId && defaultCharacter.author != 1) {
      return res.status(401).json({ message: `You are not authorized to access this character` });
    }

    res.status(200).json({ "result": defaultCharacter });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving default character" });
  }
}


const addCharacter = async (req, res) => {
  const {
    name,
    status,
    species,
    type,
    gender,
    origin_name,
    location_name,
    image,
  } = req.body;

  //DESCOMENTAR CUANDO SE HAGA EL FORM

  const user = req.user.id;
  //const user = 2;

  console.log("body:", req.body)

  if (
    !name ||
    !status ||
    !species ||
    !type ||
    !gender ||
    !origin_name ||
    !location_name ||
    !image
  ) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  try {
    const customCharacter = await DefaultCharacter.create({
      name,
      author: user,
      status,
      species,
      type,
      gender,
      origin_name,
      location_name,
      image,
    });

    return res.status(201).json(customCharacter);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteCharacter = async (req, res) => {

  const characterId = req.params.id;
  const authorId = req.user.id;


  console.log("characterId", characterId);
  console.log("authorId", authorId);

  try {
    const character = await DefaultCharacter.findByPk(characterId);
    console.log("character", character.id);
    console.log("character at", character.author);
    if (!character) {
      return res.status(404).json({ error: 'El personaje no existe' });
    }

    if (character.author != authorId) {
      return res.status(403).json({ error: 'No tienes permiso para borrar este personaje' });
    }

    await DefaultCharacter.destroy({
      where: {
        id: characterId
      }
    });

    return res.status(200).json({ message: "Borrado" });
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};



module.exports = {
  getCharacters,
  getCharactersById,
  addCharacter,
  deleteCharacter
};
