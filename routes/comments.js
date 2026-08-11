const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

router.get('/', commentsController.getAllComments);
router.get('/:id', commentsController.getCommentById);
router.get('/post/:postId', commentsController.getCommentsByPostId);
router.post('/', commentsController.createComment);
router.put('/:id', commentsController.updateComment);
router.delete('/:id', commentsController.deleteComment);

module.exports = router;