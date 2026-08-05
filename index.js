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

