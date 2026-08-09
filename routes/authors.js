const express = require('express');//importa el módulo express para crear rutas y manejar solicitudes HTTP
const router = express.Router();//crea una instancia de Router para definir rutas específicas para los autores
const authorsController = require('../controllers/authors');//importa el controller que contiene la lógica de cada ruta de autores

router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getAuthorById);
router.post('/', authorsController.createAuthor);
router.put('/:id', authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;