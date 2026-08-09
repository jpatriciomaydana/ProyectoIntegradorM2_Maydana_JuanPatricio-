require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

const authorsRouter = require('./routes/authors');
app.use('/authors', authorsRouter);

const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;