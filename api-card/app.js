import express from 'express';
import pool from './src/config/db.js';

const app = express();
app.use(express.json());

// Ver todos los items en el carrito
app.get('/cart', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT cart.id, menu.nombre, cart.cantidad, menu.precio, (menu.precio * cart.cantidad) AS total, cart.nombre AS usuario_nombre, cart.correo AS usuario_correo
      FROM cart
      JOIN menu ON cart.producto_id = menu.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar un item al carrito
app.post('/cart', async (req, res) => {
  const { producto_id, cantidad, nombre, correo } = req.body; // Añadido nombre y correo
  if (!producto_id || !cantidad || !nombre || !correo) {
    return res.status(400).json({ error: 'Faltan campos requeridos: producto_id, cantidad, nombre, correo.' });
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO cart (producto_id, cantidad, nombre, correo) VALUES ($1, $2, $3, $4) RETURNING *',
      [producto_id, cantidad, nombre, correo]
    );
    res.status(201).json(result.rows[0]); // Respuesta 201 para creación exitosa
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remover un item del carrito
app.delete('/cart/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM cart WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vaciar el carrito
app.delete('/cart', async (req, res) => {
  try {
    await pool.query('DELETE FROM cart');
    res.json({ message: 'Carrito vaciado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('Servidor de carrito de compra en http://localhost:3001');
});
