const express = require('express');//importa el módulo express para crear rutas y manejar solicitudes HTTP
const router = express.Router();//crea una instancia de Router para definir rutas específicas para el posts
const postsService = require('../services/posts');//importa el módulo postsService que contiene funciones para interactuar con la base de datos de posts

router.get('/', async (req, res) => {//ruta GET para obtener todos los posts

    try {
        const posts = await postsService.getAllPosts();//llama a la función getAllPosts del servicio de posts para obtener todos los posts
        res.json(posts);//envía la respuesta en formato JSON con los posts obtenidos

    } catch (err) {
        console.error(err);//
        res.status(500).json({ error: 'Error al obtener posts' });//envía un error 500 si ocurre algún problema al obtener los posts
    }
});

router.get('/:id', async (req, res) => {//ruta GET para obtener un post por su id
    try {
        const post = await postsService.getPostById(req.params.id);//llama a la función getPostById del servicio de posts para obtener un post específico por su id    
    if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }
        res.json(post);//envía la respuesta en formato JSON con el post obtenido
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el post' });
    }
});

router.get('/author/:authorId', async (req, res) => {//ruta GET para obtener todos los posts de un autor específico
    try {
        const authorPosts = await postsService.getPostsByAuthorId(req.params.authorId);//llama a la función getPostsByAuthorId del servicio de posts para obtener todos los posts de un autor específico
        res.json(authorPosts);//envía la respuesta en formato JSON con los posts obtenidos
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los posts del autor' });
    }
});

router.post('/', async (req, res) => {//ruta POST para crear un nuevo post
    try {
        const { title, content, author_id, published } = req.body;

        if (!title || !content || !author_id) {
          return res.status(400).json({ error: 'El título, el contenido y el author_id son requeridos' });
        }

        const newPost = await postsService.createPost({ title, content, author_id, published });
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el post' });
    }
});

router.put('/:id', async (req, res) => {//ruta PUT para actualizar un post existente
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
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el post' });
    }   
});

router.delete('/:id', async (req, res) => {//ruta DELETE para eliminar un post existente
    try {
        const deletedPost = await postsService.deletePost(req.params.id);//llama a la función deletePost del servicio de posts para eliminar un post existente          
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }       
        res.json({ message: 'Post eliminado correctamente' });//envía la respuesta en formato JSON con un mensaje de éxito
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el post' });
    }   

});

module.exports = router;//exporta el router para que pueda ser utilizado en otros archivos  
