const request = require('supertest');
const app = require('../app');
const pool = require('../db/dbconnect');

describe('Authors API', () => {
  test('POST /authors crea un nuevo autor', async () => {
    const response = await request(app)
      .post('/authors')
      .send({
        name: 'Test Author',
        email: `test${Date.now()}_${Math.random().toString(36).substring(2, 8)}@example.com`,
        bio: 'Bio de prueba'
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Author');
    expect(response.body.id).toBeDefined();
  });

  test('GET /authors/:id debería devolver un autor existente', async () => {
    const newAuthorResponse = await request(app)
      .post('/authors')
      .send({
        name: 'Test Author',
        email: `test${Date.now()}_${Math.random().toString(36).substring(2, 8)}@example.com`,
        bio: 'Bio de prueba'
      });

    const authorId = newAuthorResponse.body.id;
    const response = await request(app).get(`/authors/${authorId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(authorId);
  });

  test('PUT /authors/:id actualiza un autor existente', async () => {
    const newAuthorResponse = await request(app)
      .post('/authors')
      .send({
        name: 'Test Author',
        email: `test${Date.now()}_${Math.random().toString(36).substring(2, 8)}@example.com`,
        bio: 'Bio de prueba'
      });

    const authorId = newAuthorResponse.body.id;

    const response = await request(app)
      .put(`/authors/${authorId}`)
      .send({
        name: 'Test Author Actualizado',
        email: `updated${Date.now()}_${Math.random().toString(36).substring(2, 8)}@example.com`,
        bio: 'Bio actualizada'
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Test Author Actualizado');
    expect(response.body.id).toBe(authorId);
  });

  test('DELETE /authors/:id elimina un autor existente', async () => {
  const newAuthorResponse = await request(app)
    .post('/authors')
    .send({
      name: 'Test Author to Delete',
      email: `test${Date.now()}_${Math.random().toString(36).substring(2, 8)}@example.com`,
      bio: 'Bio de prueba'
    });

  const authorId = newAuthorResponse.body.id;

  const response = await request(app).delete(`/authors/${authorId}`);

  expect(response.status).toBe(204);
});

  afterAll(async () => {
    await pool.end();
  });
});