const postsService = require('../services/posts');

function isValidId(id) {
  return /^\d+$/.test(id);
}

async function getAllPosts(req, res, next) {
    try {
        const posts = await postsService.getAllPosts();
        res.json(posts);
    } catch (err) {
        next(err);
    }
}

async function getPostById(req, res, next) {
    try {
        if (!isValidId(req.params.id)) {
          return res.status(400).json({ error: 'El id debe ser un número' });
        }
        const post = await postsService.getPostById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }
        res.json(post);
    } catch (err) {
        next(err);
    }
}

async function getPostsByAuthorId(req, res, next) {
    try {
        if (!isValidId(req.params.authorId)) {
          return res.status(400).json({ error: 'El authorId debe ser un número' });
        }
        const authorPosts = await postsService.getPostsByAuthorId(req.params.authorId);
        res.json(authorPosts);
    } catch (err) {
        next(err);
    }
}

async function createPost(req, res, next) {
    try {
        const { title, content, author_id, published } = req.body;

        if (!title || !content || !author_id) {
          return res.status(400).json({ error: 'El título, el contenido y el author_id son requeridos' });
        }
        if (!isValidId(String(author_id))) {
          return res.status(400).json({ error: 'author_id debe ser un número' });
        }

        const newPost = await postsService.createPost({ title, content, author_id, published });
        res.status(201).json(newPost);
    } catch (err) {
        next(err);
    }
}

async function updatePost(req, res, next) {
   try {
        if (!isValidId(req.params.id)) {
          return res.status(400).json({ error: 'El id debe ser un número' });
        }
        const { title, content, published } = req.body;

        if (!title || !content) {
          return res.status(400).json({ error: 'El título y el contenido son requeridos' });
        }

        const updatedPost = await postsService.updatePost(req.params.id, { title, content, published });
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }
        res.json(updatedPost);
    } catch (err) {
        next(err);
    }
}

async function deletePost(req, res, next) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'El id debe ser un número' });
    }
    const deletedPost = await postsService.deletePost(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  createPost,
  updatePost,
  deletePost
};