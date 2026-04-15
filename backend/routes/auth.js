const express = require('express');
const router = express.Router();
const db = require('../db');

// test
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route works' });
});


// REGISTER
router.post('/register', (req, res) => {
  const { first_name, last_name, age, gender, username, password } = req.body;

  if (age < 13) {
    return res.status(400).json({ error: 'User must be at least 13 years old' });
  }

  const sql = `
    INSERT INTO social_users (first_name, last_name, age, gender, username, password)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [first_name, last_name, age, gender, username, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Register failed', detail: err.message });
    }

    res.json({ message: 'User registered successfully' });
  });
});


// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = `
    SELECT * FROM social_users
    WHERE username = ? AND password = ?
  `;

  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Login failed', detail: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: results[0]
    });
  });
});

module.exports = router;