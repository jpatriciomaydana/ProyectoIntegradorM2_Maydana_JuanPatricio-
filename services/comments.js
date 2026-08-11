const pool = require('../db/dbInit'); //importa la instancia de Pool desde dbInit.js

async function getAllComments() {
  const result = await pool.query(
    `SELECT 
       comments.id,
       comments.post_id,
       comments.author_id,
       comments.content,
       comments.created_at,
       authors.name AS author_name
     FROM comments
     LEFT JOIN authors ON comments.author_id = authors.id
     ORDER BY comments.id`
  );
  return result.rows;
}

async function getCommentById(id) {
  const result = await pool.query(
    `SELECT 
       comments.id,
       comments.post_id,
       comments.author_id,
       comments.content,
       comments.created_at,
       authors.name AS author_name
     FROM comments
     LEFT JOIN authors ON comments.author_id = authors.id
     WHERE comments.id = $1`,
    [id]
  );
  return result.rows[0];
}

async function getCommentsByPostId(postId) {
  const result = await pool.query(
    `SELECT 
       comments.id,
       comments.post_id,
       comments.author_id,
       comments.content,
       comments.created_at,
       authors.name AS author_name
     FROM comments
     LEFT JOIN authors ON comments.author_id = authors.id
     WHERE comments.post_id = $1
     ORDER BY comments.id`,
    [postId]
  );
  return result.rows;
}

async function createComment({ post_id, author_id, content }) {
  const result = await pool.query(
    'INSERT INTO comments (post_id, author_id, content) VALUES ($1, $2, $3) RETURNING *',
    [post_id, author_id, content]
  );
  return result.rows[0];
}

async function updateComment(id, { content }) {
  const result = await pool.query(
    'UPDATE comments SET content = $1 WHERE id = $2 RETURNING *',
    [content, id]
  );
  return result.rows[0];
}

async function deleteComment(id) {
  const result = await pool.query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

module.exports = {
  getAllComments,
  getCommentById,
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};