const express = require('express');//importa el módulo express para crear rutas y manejar solicitudes HTTP
const router = express.Router();//crea una instancia de Router para definir rutas específicas para el posts
const postsService = require('../services/posts');//importa el módulo postsService que contiene funciones para interactuar con la base de datos de posts

router.get('/', async (req, res, next) => {//ruta GET para obtener todos los posts

    try {
        const posts = await postsService.getAllPosts();//llama a la función getAllPosts del servicio de posts para obtener todos los posts
        res.json(posts);//envía la respuesta en formato JSON con los posts obtenidos

    } catch (err) {
        next(err);//pasa el error al middleware de manejo de errores
    }
});

router.get('/:id', async (req, res, next) => {
    try {        
        const post = await postsService.getPostById(req.params.id);    
    if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }
        res.json(post);//envía la respuesta en formato JSON con el post obtenido
    } catch (err) {
        next(err);
    }
});

router.get('/author/:authorId', async (req, res, next) => {//ruta GET para obtener todos los posts de un autor específico
    try {
        const authorPosts = await postsService.getPostsByAuthorId(req.params.authorId);//llama a la función getPostsByAuthorId del servicio de posts para obtener todos los posts de un autor específico
        res.json(authorPosts);//envía la respuesta en formato JSON con los posts obtenidos
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {//ruta POST para crear un nuevo post
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
});

router.put('/:id', async (req, res, next) => {//ruta PUT para actualizar un post existente
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
});

router.delete('/:id', async (req, res, next) => {//ruta DELETE para eliminar un post existente
    try {
        const deletedPost = await postsService.deletePost(req.params.id);//llama a la función deletePost del servicio de posts para eliminar un post existente          
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }       
        res.json({ message: 'Post eliminado correctamente' });//envía la respuesta en formato JSON con un mensaje de éxito
    } catch (err) {
        next(err);
    }   

});

module.exports = router;