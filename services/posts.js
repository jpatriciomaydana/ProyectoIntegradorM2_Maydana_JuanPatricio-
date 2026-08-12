const pool = require('../db/connection'); //importa la instancia de Pool desde connection.js

async function getAllPosts() {
  const result = await pool.query('SELECT * FROM posts ORDER BY id');
  return result.rows;
}

async function getPostById(id) {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
}

async function getPostsByAuthorId(authorId) {
  const result = await pool.query(
    `SELECT 
       posts.id,
       posts.title,
       posts.content,
       posts.author_id,
       posts.published,
       posts.created_at,
       authors.name AS author_name,
       authors.email AS author_email
     FROM posts
     JOIN authors ON posts.author_id = authors.id
     WHERE posts.author_id = $1
     ORDER BY posts.id`,
    [authorId]
  );
  return result.rows;
}

async function createPost({ title, content, author_id, published }) {
  const result = await pool.query(
    'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, content, author_id, published || false]
  );
  return result.rows[0];
}

async function updatePost(id, { title, content, published }) {
  const result = await pool.query(
    'UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 RETURNING *',
    [title, content, published, id]
  );
  return result.rows[0];
}

async function deletePost(id) {
  const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  createPost,
  updatePost,
  deletePost,
};