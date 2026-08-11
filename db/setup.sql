CREATE TABLE authors (

 id SERIAL PRIMARY KEY,

 name VARCHAR(100) NOT NULL,

 email VARCHAR(150) UNIQUE NOT NULL,

 bio TEXT,

 created_at TIMESTAMPTZ DEFAULT NOW()

);

CREATE TABLE posts (

 id SERIAL PRIMARY KEY,

 title VARCHAR(200) NOT NULL,

 content TEXT NOT NULL,

 author_id INTEGER NOT NULL,

 published BOOLEAN DEFAULT FALSE,

 created_at TIMESTAMPTZ DEFAULT NOW(),

 FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE

);

CREATE TABLE comments (

    id SERIAL PRIMARY KEY,

    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,

    author_id INTEGER REFERENCES authors(id) ON DELETE SET NULL,

    content TEXT NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_author_id ON posts(author_id);

CREATE INDEX idx_comments_post_id ON comments(post_id);

INSERT INTO authors (name, email, bio) VALUES

 ('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),

 ('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),

 ('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST');


 INSERT INTO posts (title, content, author_id, content) VALUES

 ('Introducción a Node.js', 'Node.js es un runtime de JavaScript...', 1, true),

 ('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', 2, true),

 ('APIs RESTful', 'REST es un estilo arquitectónico...', 1, true),

 ('Manejo de errores en Express', 'El manejo apropiado de errores...', 3, false),

 ('Async/Await explicado', 'Las promesas simplifican el código asíncrono...', 1, false);

 INSERT INTO comments (post_id, author_id, content) VALUES

 (1, 'Luis Fernández', 'Excelente artículo sobre Node.js!'),

 (2, 'Sofía Martínez', 'Muy útil la comparación entre PostgreSQL y MySQL.'),

 (3, 'Javier Torres', 'Gracias por la explicación sobre REST.'),

 (1, 'Ana García', 'Me alegra que te haya gustado!'),

 (4, 'Carlos Ruiz', 'Espero que el manejo de errores te sea útil.');