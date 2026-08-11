const request = require('supertest');
const app = require('../app');
const pool = require('../db/dbInit'); // O la ruta a tu pool/dbInit

describe('Endpoints de Comments', () => {
  afterAll(async () => {
    await pool.end(); // Cierra las conexiones pendientes
  });

  test('GET /comments debe responder con status 200 y un array', async () => {
    const response = await request(app).get('/comments');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /comments debe fallar con 400 si falta el content', async () => {
    const response = await request(app)
      .post('/comments')
      .send({ post_id: 1 });
    expect(response.statusCode).toBe(400);
  });
});