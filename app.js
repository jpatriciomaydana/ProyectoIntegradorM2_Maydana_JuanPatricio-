require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const authorsRouter = require('./routes/authors');
app.use('/authors', authorsRouter);

const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

const commentsRouter = require('./routes/comments');
app.use('/comments', commentsRouter);

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;