const commentsService = require('../services/comments');
const postsService = require('../services/posts');

function isValidId(id) {
  return /^\d+$/.test(id);
}

async function getAllComments(req, res, next) {
  try {
    const comments = await commentsService.getAllComments();
    res.json(comments);
  } catch (error) {
    next(error);
  }
}

async function getCommentById(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ error: 'El id debe ser un número' });
    }
    const comment = await commentsService.getCommentById(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }
    res.json(comment);
  } catch (error) {
    next(error);
  }
}

async function getCommentsByPostId(req, res, next) {
  try {
    const { postId } = req.params;
    if (!isValidId(postId)) {
      return res.status(400).json({ error: 'El postId debe ser un número' });
    }

    const postExists = await postsService.getPostById(postId);
    if (!postExists) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    const comments = await commentsService.getCommentsByPostId(postId);
    res.json(comments);
  } catch (error) {
    next(error);
  }
}

async function createComment(req, res, next) {
  try {
    const { post_id, author_id, content } = req.body;

    if (!post_id || !content) {
      return res.status(400).json({ error: 'post_id y content son requeridos' });
    }
    if (!isValidId(String(post_id))) {
      return res.status(400).json({ error: 'post_id debe ser un número' });
    }
    if (author_id !== undefined && author_id !== null && !isValidId(String(author_id))) {
      return res.status(400).json({ error: 'author_id debe ser un número' });
    }

    const newComment = await commentsService.createComment({ post_id, author_id, content });
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
}

async function updateComment(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ error: 'El id debe ser un número' });
    }
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'El contenido es requerido' });
    }

    const updated = await commentsService.updateComment(id, { content });
    if (!updated) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
}

async function deleteComment(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ error: 'El id debe ser un número' });
    }
    const deleted = await commentsService.deleteComment(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }
    res.json({ message: 'Comentario eliminado exitosamente', comment: deleted });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllComments,
  getCommentById,
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};