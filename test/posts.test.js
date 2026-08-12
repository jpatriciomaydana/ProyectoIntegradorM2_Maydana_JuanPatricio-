const request = require('supertest');
const app = require('../app');
const pool = require('../db/connection');

describe('Posts API', () => {
  let authorId;

  // Creamos un autor previo para poder asociar los posts
  beforeAll(async () => {
    const authorRes = await request(app)
      .post('/authors')
      .send({
        name: 'Post Tester',
        email: `post_tester_${Date.now()}@example.com`,
        bio: 'Bio para posts'
      });
    authorId = authorRes.body.id;
  });

  // --- CRUD EXITOSO ---

  test('POST /posts crea un nuevo post', async () => {
    const response = await request(app)
      .post('/posts')
      .send({
        title: 'Título de Prueba',
        content: 'Contenido de prueba para el post',
        author_id: authorId
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Título de Prueba');
    expect(response.body.id).toBeDefined();
  });

  test('GET /posts devuelve la lista completa de posts', async () => {
    const response = await request(app).get('/posts');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /posts/:id devuelve un post existente por ID', async () => {
    const newPostRes = await request(app)
      .post('/posts')
      .send({
        title: 'Post para GET',
        content: 'Contenido',
        author_id: authorId
      });

    const postId = newPostRes.body.id;
    const response = await request(app).get(`/posts/${postId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(postId);
  });

  test('PUT /posts/:id actualiza un post existente', async () => {
    const newPostRes = await request(app)
      .post('/posts')
      .send({
        title: 'Post Original',
        content: 'Contenido Original',
        author_id: authorId
      });

    const postId = newPostRes.body.id;
    const response = await request(app)
      .put(`/posts/${postId}`)
      .send({
        title: 'Post Modificado',
        content: 'Contenido Modificado',
        author_id: authorId
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Post Modificado');
  });

  test('DELETE /posts/:id elimina un post existente', async () => {
    const newPostRes = await request(app)
      .post('/posts')
      .send({
        title: 'Post para Borrar',
        content: 'Contenido borrable',
        author_id: authorId
      });

    const postId = newPostRes.body.id;
    const response = await request(app).delete(`/posts/${postId}`);

   expect(response.status).toBe(204);
  });

  // --- CASOS DE ERROR ---

  test('POST /posts devuelve 400 si faltan campos obligatorios', async () => {
    const response = await request(app)
      .post('/posts')
      .send({
        title: 'Sin contenido ni autor'
      });

    expect(response.status).toBe(400);
  });

  test('DELETE /posts/:id devuelve 404 si el post no existe', async () => {
    const response = await request(app).delete('/posts/999999');

    expect(response.status).toBe(404);
  });

  afterAll(async () => {
    await pool.query(`DELETE FROM authors WHERE email LIKE 'post_tester_%@example.com'`);
    await pool.end();
  });
});