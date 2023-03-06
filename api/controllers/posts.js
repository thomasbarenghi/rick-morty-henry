const posts = require('../data/data.js').posts;
const users = require('../data/data.js').users;

// Obtener todos los posts
function getAllPosts(req, res) {
    res.json(posts);
}

// Obtener un post por ID
function getPostById(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post no encontrado' });
    }
}

// Agregar un nuevo post
function createPost(req, res) {
    const { title, body, userId } = req.body;
    const id = posts.length + 1;

    if (!title || !body || !userId) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    if (!users.find((user) => user.id === userId)) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const newPost = { id, title, body, userId };
    posts.push(newPost);

    const user = users.find((user) => user.id === userId);
    user.posts.push(newPost);
    res.status(201).json(newPost);
}

//Borrar un post
function deletePost(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (post) {
        const index = posts.indexOf(post);
        posts.splice(index, 1);
        res.status(200).json({ message: 'Post eliminado' });
    } else {
        res.status(404).json({ message: 'Post no encontrado' });
    }
}

// Actualizar un post
function updatePost(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    const { title, body } = req.body;

    if (!title && !body) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    if (post) {
        post.title = title;
        post.body = body;
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: 'Post no encontrado' });
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    deletePost,
    updatePost
};