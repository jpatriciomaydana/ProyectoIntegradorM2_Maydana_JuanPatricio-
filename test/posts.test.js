const request = require('supertest');
const app = require('../app');
const pool = require('../db/dbconnect');

describe('Posts API', () => {
    test('POST /posts crea un nuevo post', async () => {
        // Primero, crea un autor para asociarlo con el post
        const newAuthorResponse = await request(app)
          .post('/authors')
            .send({
                name: 'Test Author for Post',
                email: `test${Date.now()}_${Math.random().toString(36).substring(2, 8)}@example.com`,
                bio: 'Bio de prueba para post'
            });

        const authorId = newAuthorResponse.body.id;

        const response = await request(app)
            .post('/posts')
            .send({
                title: 'Test Post',
                content: 'Contenido de prueba',
                author_id: authorId
            }); 

        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Post');
        expect(response.body.id).toBeDefined();
    });
   
    test('DELETE /posts/:id debería devolver 404 si el post no existe', async () => {
        const response = await request(app).delete('/posts/99999999');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Post no encontrado');
    }); 

    afterAll(async () => {
      await pool.end();
    }); 
});

