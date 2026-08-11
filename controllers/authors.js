const authorsService = require('../services/authors');//importa el módulo authorsService que contiene funciones para interactuar con la base de datos de autores

async function getAllAuthors(req, res, next) {//obtiene todos los autores
  try {
    const authors = await authorsService.getAllAuthors();//llama a la función getAllAuthors del servicio de autores para obtener todos los autores
    res.json(authors);//envía la respuesta en formato JSON con la lista de autores
  } catch (err) {//maneja errores en caso de que ocurra algún problema al obtener los autores
    next(err);//pasa el error al siguiente middleware de manejo de errores
  }
}

async function getAuthorById(req, res, next) {//obtiene un autor por su id
  try {
    const author = await authorsService.getAuthorById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(author);
  } catch (err) {
    next(err);
  }
}

async function createAuthor(req, res, next) {//crea un nuevo autor
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
}

async function updateAuthor(req, res, next) {//actualiza un autor existente
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
}

async function deleteAuthor(req, res, next) {
  try {
    const deletedAuthor = await authorsService.deleteAuthor(req.params.id);
    if (!deletedAuthor) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};