const pool = require('./dbInit');//importa el pool de conexión ya configurado

async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS authors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        bio TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('Tabla authors creada (o ya existía)');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        author_id INTEGER NOT NULL,
        published BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
      );
    `);
    console.log('Tabla posts creada (o ya existía)');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        author_id INTEGER REFERENCES authors(id) ON DELETE SET NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('Tabla comments creada (o ya existía)');

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
    `);
    console.log('Índices creados (o ya existían)');

    // Insertar autores semilla (protegido con ON CONFLICT, porque email es UNIQUE)
    await pool.query(`
      INSERT INTO authors (name, email, bio) VALUES
       ('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
       ('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
       ('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST')
      ON CONFLICT (email) DO NOTHING;
    `);
    console.log('Autores semilla insertados (o ya existían)');

    // Insertar posts semilla, solo si la tabla posts está vacía
    const { rows } = await pool.query('SELECT COUNT(*) FROM posts');
    const postsCount = parseInt(rows[0].count, 10);

    if (postsCount === 0) {
      await pool.query(`
        INSERT INTO posts (title, content, author_id, published) VALUES
         ('Introducción a Node.js', 'Node.js es un runtime de JavaScript...', 1, true),
         ('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', 2, true),
         ('APIs RESTful', 'REST es un estilo arquitectónico...', 1, true),
         ('Manejo de errores en Express', 'El manejo apropiado de errores...', 3, false),
         ('Async/Await explicado', 'Las promesas simplifican el código asíncrono...', 1, false);
      `);
      console.log('Posts semilla insertados');
    } else {
      console.log('La tabla posts ya tiene datos, se omite la inserción semilla');
    }

    // Insertar comentarios semilla, solo si la tabla comments está vacía
    const { rows: commentRows } = await pool.query('SELECT COUNT(*) FROM comments');
    const commentsCount = parseInt(commentRows[0].count, 10);

    if (commentsCount === 0) {
      await pool.query(`
        INSERT INTO comments (post_id, author_id, content) VALUES
         (1, NULL, 'Excelente artículo sobre Node.js!'),
         (2, NULL, 'Muy útil la comparación entre PostgreSQL y MySQL.'),
         (3, NULL, 'Gracias por la explicación sobre REST.'),
         (1, 1,    'Me alegra que te haya gustado!'),
         (4, 2,    'Espero que el manejo de errores te sea útil.');
      `);
      console.log('Comentarios semilla insertados');
    } else {
      console.log('La tabla comments ya tiene datos, se omite la inserción semilla');
    }

    console.log('Base de datos inicializada correctamente');
  } catch (err) {
    console.error('Error inicializando la base de datos:', err);
  } finally {
    await pool.end();
  }
}

initDb();