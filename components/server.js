// server.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001; // Use the environment port or 3001 if not available

app.use(cors());
app.use(express.json());

// Use a connection pool to handle multiple connections efficiently
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce',
  connectionLimit: 10, // Adjust the limit based on your needs
});

// Check if the connection is successful
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  connection.release();
});

app.get('/api/products', (req, res) => {
  pool.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  pool.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Product not found');
      return;
    }
    res.json(results[0]);
  });
});

app.post('/api/register', (req, res) => {
  const { username, email, password, country, address } = req.body;

  pool.query(
    'INSERT INTO users (username, email, password, country, address) VALUES (?, ?, ?, ?, ?)',
    [username, email, password, country, address],
    (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
        return;
      }

      res.json({ success: true, message: 'User registered successfully' });
    }
  );
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  pool.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
        return;
      }

      if (results.length === 0) {
        res.json({ success: false, message: 'Invalid username or password' });
      } else {
        const user = results[0];
        res.json({ success: true, message: 'Login successful', user: { username: user.username } });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
