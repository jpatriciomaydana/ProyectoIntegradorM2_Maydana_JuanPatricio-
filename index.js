const app = require('./app');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡Servidor funcionando en Railway!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


