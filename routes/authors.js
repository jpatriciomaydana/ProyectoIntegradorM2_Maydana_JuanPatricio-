const express = require('express');//importa el módulo express para crear rutas y manejar solicitudes HTTP
const router = express.Router();//crea una instancia de Router para definir rutas específicas para los autores
const authorsService = require('../services/authors');//importa el módulo authorsService que contiene funciones para interactuar con la base de datos de autores

router.get('/', async (req, res, next) => {//ruta GET para obtener todos los autores
  try {
    const authors = await authorsService.getAllAuthors();//llama a la función getAllAuthors del servicio de autores para obtener todos los autores
    res.json(authors);//envía la respuesta en formato JSON con la lista de autores
  } catch (err) {//maneja errores en caso de que ocurra algún problema al obtener los autores

    next(err);//pasa el error al siguiente middleware de manejo de errores
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const author = await authorsService.getAuthorById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(author);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
 try {
    const { name, email, bio } = req.body;//obtiene los datos del autor desde el cuerpo de la solicitud
    if (!name || !email) {
        return res.status(400).json({ error: 'El nombre y el correo electrónico son requeridos' });
    }
    const newAuthor = await authorsService.createAuthor(name, email, bio);
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'El nombre y el mail son requeridos' });
    }

    const updatedAuthor = await authorsService.updateAuthor(req.params.id, name, email, bio);
    if (!updatedAuthor) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(updatedAuthor);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedAuthor = await authorsService.deleteAuthor(req.params.id);
    if (!deletedAuthor) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }   
    res.json({ message: 'Autor eliminado correctamente' });
  } catch (err) {
    next(err);
  }     
});


        

module.exports = router;

