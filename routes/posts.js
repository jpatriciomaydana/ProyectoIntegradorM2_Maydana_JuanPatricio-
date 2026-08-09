const express = require('express');//importa el módulo express para crear rutas y manejar solicitudes HTTP
const router = express.Router();//crea una instancia de Router para definir rutas específicas para el posts
const postsController = require('../controllers/posts');//importa el controller que contiene la lógica de cada ruta de posts

router.get('/', postsController.getAllPosts);//ruta GET para obtener todos los posts
router.get('/:id', postsController.getPostById);//ruta GET para obtener un post por id
router.get('/author/:authorId', postsController.getPostsByAuthorId);//ruta GET para obtener todos los posts de un autor específico
router.post('/', postsController.createPost);//ruta POST para crear un nuevo post
router.put('/:id', postsController.updatePost);//ruta PUT para actualizar un post existente
router.delete('/:id', postsController.deletePost);//ruta DELETE para eliminar un post existente

module.exports = router;