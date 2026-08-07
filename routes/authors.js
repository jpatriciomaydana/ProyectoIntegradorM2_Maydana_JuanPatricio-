const express = require('express');//importa el módulo express para crear rutas y manejar solicitudes HTTP
const router = express.Router();//crea una instancia de Router para definir rutas específicas para los autores
const authorsService = require('../services/authors');//importa el módulo authorsService que contiene funciones para interactuar con la base de datos de autores

router.get('/', async (req, res) => {
  try {
    const authors = await authorsService.getAllAuthors();
    res.json(authors);
  } catch (err) {

    console.error(err); 
    res.status(500).json({ error: 'Error al obtener autores' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const author = await authorsService.getAuthorById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(author);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener autor' });
  }
});

router.post('/', async (req, res) => {
 try {
    const { name, email, bio } = req.body;//obtiene los datos del autor desde el cuerpo de la solicitud
    if (!name || !email) {
        return res.status(400).json({ error: 'El nombre y el correo electrónico son requeridos' });
    }
    const newAuthor = await authorsService.createAuthor(name, email, bio);
    res.status(201).json(newAuthor);
  } catch (err) {
    
    console.error(err);
    res.status(500).json({ error: 'Error al crear autor' });
  }
});

router.put('/:id', async (req, res) => {
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
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar autor' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedAuthor = await authorsService.deleteAuthor(req.params.id);
    if (!deletedAuthor) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }   
    res.json({ message: 'Autor eliminado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar autor' });
  }     
});


        

module.exports = router;

