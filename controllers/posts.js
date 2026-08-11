const postsService = require('../services/posts');//importa el módulo postsService que contiene funciones para interactuar con la base de datos de posts

async function getAllPosts(req, res, next) {//obtiene todos los posts
    try {
        const posts = await postsService.getAllPosts();//llama a la función getAllPosts del servicio de posts para obtener todos los posts
        res.json(posts);//envía la respuesta en formato JSON con los posts obtenidos
    } catch (err) {
        next(err);//pasa el error al middleware de manejo de errores
    }
}

async function getPostById(req, res, next) {//obtiene un post por su id
    try {        
        const post = await postsService.getPostById(req.params.id);    
        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }
        res.json(post);//envía la respuesta en formato JSON con el post obtenido
    } catch (err) {
        next(err);
    }
}

async function getPostsByAuthorId(req, res, next) {//obtiene todos los posts de un autor específico
    try {
        const authorPosts = await postsService.getPostsByAuthorId(req.params.authorId);//llama a la función getPostsByAuthorId del servicio de posts para obtener todos los posts de un autor específico
        res.json(authorPosts);//envía la respuesta en formato JSON con los posts obtenidos
    } catch (err) {
        next(err);
    }
}

async function createPost(req, res, next) {//crea un nuevo post
    try {
        const { title, content, author_id, published } = req.body;

        if (!title || !content || !author_id) {
          return res.status(400).json({ error: 'El título, el contenido y el author_id son requeridos' });
        }

        const newPost = await postsService.createPost({ title, content, author_id, published });
        res.status(201).json(newPost);
    } catch (err) {
        next(err);
    }
}

async function updatePost(req, res, next) {//actualiza un post existente
   try {
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