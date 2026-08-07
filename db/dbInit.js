require('dotenv').config(); //carga las variables de tu .env para que process.env.X funcione.
const { Pool } = require('pg');//importa la clase Pool de pg para conectarse a PostgreSQL

const pool = new Pool({ //crea una nueva instancia de Pool con la configuración de conexión a la base de datos
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;