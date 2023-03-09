const Favorite = require('../models/index').favoriteCharacterModels;
const DefaultCharacter = require('../models/index').defaultCharacterModels;
const CustomCharacter = require('../models/index').customCharacterModels;

//Example: ?postId=1&postType=custom
const getFavorites = async (req, res) => {
    const userId = req.user.id;
    console.log("soy user id", req.headers)
    try {
        const favorites = await Favorite.findAll({
            where: { userId: userId },
            include: {
                model: DefaultCharacter,
                attributes: [
                    "id",
                    "name",
                    "status",
                    "species",
                    "type",
                    "gender",
                    "origin_name",
                    "location_name",
                    "image",
                    "author",
                ],
            },
        });
        const defaultCharacters = favorites.map((favorite) => favorite.default_character);
        return res.status(200).json({ "result": defaultCharacters });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

const deleteFavorite = async (req, res) => {
    const userId = req.user.id;
    const favoriteId = req.params.id;



    if (!userId) {
        return res.status(400).json({ error: 'Falta el id del usuario en el header' });
    }


    try {
        const favorite = await Favorite.findOne({
            where: { defaultCharacterId: favoriteId, userId: userId },
        });


        if (!favorite) {
            return res.status(404).json({ error: "Favorito no encontrado" });
        }

        await favorite.destroy();

        return res.status(200).json({ message: "Favorito eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};



const addFavorite = async (req, res) => {
    const userId = req.user.id;
    //console.log(req.body)

    if (!userId) {
        return res.status(400).json({ error: 'Falta el id del usuario en el header' });
    }

    const { defaultCharacterId } = req.body;

    if (!defaultCharacterId) {
        return res.status(400).json({ error: 'Falta el id del personaje' });
    }

    try {

        const isAlreadyFavorite = await Favorite.findOne({
            where: { defaultCharacterId: defaultCharacterId, userId: userId },
        });

        if (isAlreadyFavorite) {
            return res.status(400).json({ error: 'El personaje ya está en favoritos' });
        }

        const favorite = await Favorite.create({
            defaultCharacterId,
            userId: userId,
        });

        return res.status(201).json(favorite);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


module.exports = {
    getFavorites,
    deleteFavorite,
    addFavorite
}
