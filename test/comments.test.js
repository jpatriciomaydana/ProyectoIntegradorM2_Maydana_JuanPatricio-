const request = require('supertest');
const app = require('../app');
const pool = require('../db/connection');

describe('Comments API', () => {
  let authorId;
  let postId;

  beforeAll(async () => {
    // 1. Crear autor auxiliar
    const authorRes = await request(app)
      .post('/authors')
      .send({
        name: 'Comment Tester',
        email: `comment_tester_${Date.now()}@example.com`,
        bio: 'Bio'
      });
    authorId = authorRes.body.id;

    // 2. Crear post auxiliar
    const postRes = await request(app)
      .post('/posts')
      .send({
        title: 'Post para comentarios',
        content: 'Contenido',
        author_id: authorId
      });
    postId = postRes.body.id;
  });

  // --- CRUD EXITOSO ---

  test('POST /comments crea un nuevo comentario', async () => {
    const response = await request(app)
      .post('/comments')
      .send({
        post_id: postId,
        author_id: authorId,
        content: 'Excelente publicación'
      });

    expect(response.status).toBe(201);
    expect(response.body.content).toBe('Excelente publicación');
    expect(response.body.id).toBeDefined();
  });

  test('GET /comments obtiene la lista de todos los comentarios', async () => {
    const response = await request(app).get('/comments');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /comments/:id obtiene un comentario específico', async () => {
    const newComment = await request(app)
      .post('/comments')
      .send({ post_id: postId, author_id: authorId, content: 'Comentario GET' });

    const commentId = newComment.body.id;
    const response = await request(app).get(`/comments/${commentId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(commentId);
  });

  test('PUT /comments/:id actualiza un comentario', async () => {
    const newComment = await request(app)
      .post('/comments')
      .send({ post_id: postId, author_id: authorId, content: 'Texto inicial' });

    const commentId = newComment.body.id;
    const response = await request(app)
      .put(`/comments/${commentId}`)
      .send({ content: 'Texto editado' });

    expect(response.status).toBe(200);
    expect(response.body.content).toBe('Texto editado');
  });

  test('DELETE /comments/:id elimina un comentario', async () => {
    const newComment = await request(app)
      .post('/comments')
      .send({ post_id: postId, author_id: authorId, content: 'A borrar' });

    const commentId = newComment.body.id;
    const response = await request(app).delete(`/comments/${commentId}`);

    expect(response.status).toBe(200);
  });

  // --- CASOS DE ERROR ---

  test('POST /comments devuelve 400 si no se envía content', async () => {
    const response = await request(app)
      .post('/comments')
      .send({ post_id: postId, author_id: authorId });

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await pool.query(`DELETE FROM authors WHERE email LIKE 'comment_tester_%@example.com'`);
    await pool.end();
  });
});