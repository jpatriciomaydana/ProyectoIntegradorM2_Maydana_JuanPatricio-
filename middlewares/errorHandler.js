function errorHandler(err, req, res, next) {
  console.error(err);

 
  if (err.code === '23505') {
    return res.status(409).json({ error: 'El valor ya existe (ej. email duplicado)' });
  }

  
  if (err.code === '22P02') {
    return res.status(400).json({ error: 'Formato de dato inválido' });
  }

  if (err.code === '23503') {
    return res.status(400).json({ error: 'Referencia inválida: el recurso relacionado no existe' });
  }

  if (err.code === '23502') {
    return res.status(400).json({ error: 'Falta un campo obligatorio' });
  }

  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
}

module.exports = errorHandler;