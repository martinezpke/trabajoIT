import express from 'express';
import pool from './src/config/db.js';

const app = express();
app.use(express.json());

// Obtener todos los elementos del menú
app.get('/menu', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar un nuevo elemento al menú
app.post('/menu', async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO menu (nombre, descripcion, url_images, precio) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, descripcion, precio]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un elemento del menú
app.delete('/menu/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM menu WHERE id = $1', [id]);
    res.json({ message: 'Item eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor de menú de restaurante en http://localhost:3000');
});
