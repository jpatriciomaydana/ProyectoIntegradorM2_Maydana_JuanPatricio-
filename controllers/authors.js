const authorsService = require('../services/authors');

function isValidId(id) {
  return /^\d+$/.test(id);
}

async function getAllAuthors(req, res, next) {
  try {
    const authors = await authorsService.getAllAuthors();
    res.json(authors);
  } catch (err) {
    next(err);
  }
}

async function getAuthorById(req, res, next) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'El id debe ser un número' });
    }
    const author = await authorsService.getAuthorById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(author);
  } catch (err) {
    next(err);
  }
}

async function createAuthor(req, res, next) {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'El nombre y el correo electrónico son requeridos' });
    }
    const newAuthor = await authorsService.createAuthor(name, email, bio);
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
}

async function updateAuthor(req, res, next) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'El id debe ser un número' });
    }
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
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'El id debe ser un número' });
    }
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