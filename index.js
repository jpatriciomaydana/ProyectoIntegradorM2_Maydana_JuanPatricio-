const express = require('express');
const { Router } = require("express");

const app = express();
const router = Router()
const PORT = process.env.PORT || 3000;

app.use(express.json());
 
app.use(router);

router.get('/', (request, response) => {
  response.send('Hello, World!');   
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let authors = [

 {

   id: 1,

   name: 'Ana García',

   email: 'ana@example.com',

   bio: 'Desarrolladora full-stack apasionada por Node.js'

 },

 {

   id: 2,

   name: 'Carlos Ruiz',

   email: 'carlos@example.com',

   bio: 'Escritor técnico especializado en bases de datos'

 },

 {

   id: 3,

   name: 'María López',

   email: 'maria@example.com',

   bio: 'Ingeniera de software con foco en APIs REST'

 }

];

router.get('/authors', (req, res) => {
    res.json(authors);
});

router.get('/authors/:id', (req, res) => {
   const author = authors.find(a => a.id === parseInt(req.params.id));
  
  if (!author) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }
  
  res.json(author);
});

router.post('/authors', (req, res) => {
  const { name, email, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'El nombre y el correo electrónico son requeridos' });
  }

  const newAuthor = {
    id: authors.length + 1,
    name,
    email,
    bio
  };
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

router.put('/authors/:id', (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  
  if (!author) {
    return res.status(404).json({ error: 'Autor no encontrado' });
  }
  
  const { name, email, bio } = req.body;
  
  if (name) author.name = name;
  if (email) author.email = email;
  if (bio !== undefined) author.bio = bio;
  
  res.json(author);
});

router.delete('/authors/:id', (req, res) => {   
    const authorIndex = authors.findIndex(a => a.id === parseInt(req.params.id));
    if (authorIndex === -1) {
        return res.status(404).json({ error: 'Autor no encontrado' });
    }
    authors.splice(authorIndex, 1);
    res.status(200).json({ message: 'Autor eliminado' });
});

let posts = [
  { 
    id: 1, 
    title: 'Introducción a Node.js', 
    content: 'Node.js es un runtime de JavaScript...', 
    author_id: 1,
    published: true
  },
  { 
    id: 2, 
    title: 'PostgreSQL vs MySQL', 
    content: 'Ambas bases de datos tienen ventajas...', 
    author_id: 2,
    published: true
  },
  { 
    id: 3, 
    title: 'APIs RESTful', 
    content: 'REST es un estilo arquitectónico...', 
    author_id: 1,
    published: true
  },
  { 
    id: 4, 
    title: 'Manejo de errores en Express', 
    content: 'El manejo apropiado de errores...', 
    author_id: 3,
    published: false
  },
  { 
    id: 5, 
    title: 'Async/Await explicado', 
    content: 'Las promesas simplifican el código asíncrono...', 
    author_id: 1,
    published: false
  }
];

router.get('/posts', (req, res) => {
    // Opcionalmente filtrar por publicados
    const {published} = req.query;
    if (published !== undefined) {
        const isPublished = published === 'true';
        const filteredPosts = posts.filter(post => post.published === isPublished);
        return res.json(filteredPosts);
    }
     res.json(posts);
});

    
router.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    
    if (!post) {
        return res.status(404).json({ error: 'Post no encontrado' 

        });
    }
    
    res.json(post);
});

  //Obtener posts con detalle de autor
router.get('/posts/author/:authorId', (req, res) => {
   const authorposts = posts.filter(p => p.author_id === parseInt(req.params.authorId));
   
   res.json(authorposts);
});

router.post('/posts', (req, res) => {
    const { title, content, author_id, published } = req.body;
    
    if (!title || !content || !author_id) {
        return res.status(400).json({ 
            error: 'El título, contenido y author_id son requeridos' 
        });
    }

    const newPost = {
        id: posts.length + 1,
        title,
        content,
        author_id,
        published: published || false
    };

    posts.push(newPost);
    res.status(201).json(newPost);
});

router.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));    

    if (!post) {
        return res.status(404).json({ error: 'Post no encontrado' });
    }   

    const { title, content, published } = req.body;

    if (title) post.title = title;
    if (content) post.content = content;
    if (published !== undefined) post.published = published;

    res.json(post);
});

router.delete('/posts/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));   

    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post no encontrado' });

    }

    posts.splice(postIndex, 1);
    res.status(200).json({ message: 'Post eliminado' });
}
);