const pool = require('../db/dbInit'); //importa la instancia de Pool desde dbInit.js

async function getAllAuthors() { //función asíncrona para obtener todos los autores
  const result = await pool.query('SELECT * FROM authors ORDER BY id');
  return result.rows;
}

async function getAuthorById(id) { //función asíncrona para obtener un autor por su id
  const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
  return result.rows[0];
}

async function createAuthor(name, email, bio) { //función asíncrona para crear un nuevo autor
  const result = await pool.query(
    'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
    [name, email, bio]
  );
  return result.rows[0];
}

async function updateAuthor(id, name, email, bio) { //función asíncrona para actualizar un autor existente
  const result = await pool.query(
    'UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *',
    [name, email, bio, id]
  );
  return result.rows[0];
}

async function deleteAuthor(id) { //función asíncrona para eliminar un autor
  const result = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};