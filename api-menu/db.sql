-- Crear tabla menu
CREATE TABLE menu (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  url_images TEXT,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL
);

-- Crear tabla cart con campos adicionales
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  producto_id INTEGER NOT NULL REFERENCES menu(id) ON DELETE CASCADE,
  cantidad INTEGER NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  correo VARCHAR(255) NOT NULL
);

-- Crear tabla reservations con campos adicionales
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  fecha TIMESTAMP NOT NULL,
  personas INTEGER NOT NULL,
  correo VARCHAR(255) NOT NULL,
  telefono VARCHAR(50) NOT NULL,
  notas TEXT
);

INSERT INTO menu (nombre, url_images, descripcion, precio) VALUES
('Pizza Margherita', 'https://example.com/images/pizza_margherita.jpg', 'Clásica pizza italiana con salsa de tomate, mozzarella y albahaca.', 12.50),
('Hamburguesa Clásica', 'https://example.com/images/hamburguesa_clasica.jpg', 'Hamburguesa de res con lechuga, tomate y cebolla.', 9.99),
('Ensalada César', 'https://example.com/images/ensalada_cesar.jpg', 'Ensalada fresca con lechuga, pollo a la parrilla, crutones y aderezo César.', 8.75),
('Tacos de Pollo', 'https://example.com/images/tacos_pollo.jpg', 'Tres tacos de pollo desmenuzado con cebolla y cilantro.', 10.00),
('Pasta Alfredo', 'https://example.com/images/pasta_alfredo.jpg', 'Pasta con crema, mantequilla y queso parmesano.', 11.25),
('Sushi Variado', 'https://example.com/images/sushi_variado.jpg', 'Selección de sushi, incluyendo nigiri y maki.', 15.00),
('Postre de Chocolate', 'https://example.com/images/postre_chocolate.jpg', 'Delicioso postre de chocolate con helado de vainilla.', 5.50);

INSERT INTO cart (producto_id, cantidad, nombre, correo) VALUES
(1, 2, 'Carlos Pérez', 'carlos@example.com'),  -- 2 Pizza Margherita
(2, 1, 'María González', 'maria@example.com'),  -- 1 Hamburguesa Clásica
(3, 3, 'Juan López', 'juan@example.com'),      -- 3 Ensaladas César
(4, 5, 'Ana Torres', 'ana@example.com');        -- 5 Tacos de Pollo

INSERT INTO reservations (nombre, fecha, personas, correo, telefono, notas) VALUES
('Carlos Pérez', '2024-11-05 19:00:00', 4, 'carlos@example.com', '1234567890', 'Reserva para celebración de cumpleaños'),
('María González', '2024-11-06 20:30:00', 2, 'maria@example.com', '0987654321', 'Mesa cerca de la ventana'),
('Juan López', '2024-11-07 18:15:00', 6, 'juan@example.com', '2345678901', 'Sin gluten, por favor'),
('Ana Torres', '2024-11-08 21:00:00', 3, 'ana@example.com', '3456789012', 'Mesa tranquila');
