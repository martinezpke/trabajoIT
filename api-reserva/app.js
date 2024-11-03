import express from 'express';
import pool from './src/config/db.js';

const app = express();
app.use(express.json());

// Ver reservas
app.get('/reservations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservations');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hacer una reserva
app.post('/reservations', async (req, res) => {
  const { nombre, fecha, personas, correo, telefono, notas } = req.body; // Añadidos campos nuevos

  // Validación de campos requeridos
  if (!nombre || !fecha || !personas || !correo || !telefono) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, fecha, personas, correo, telefono.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO reservations (nombre, fecha, personas, correo, telefono, notas) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, fecha, personas, correo, telefono, notas]
    );
    res.status(201).json(result.rows[0]); // Respuesta 201 para creación exitosa
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancelar una reserva
app.delete('/reservations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM reservations WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva cancelada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3002, () => {
  console.log('Servidor de reservas en http://localhost:3002');
});
