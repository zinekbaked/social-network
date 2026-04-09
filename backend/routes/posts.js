const express = require('express');
const router = express.Router();
const db = require('../db');


// CREATE POST
router.post('/', (req, res) => {
  const { user_id, content } = req.body;

  const sql = `
    INSERT INTO posts (user_id, content)
    VALUES (?, ?)
  `;

  db.query(sql, [user_id, content], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Post creation failed' });
    }

    res.json({ message: 'Post created' });
  });
});


// GET POSTS (feed)
router.get('/', (req, res) => {
  const sql = `
    SELECT posts.*, social_users.username
    FROM posts
    JOIN social_users ON posts.user_id = social_users.id
    ORDER BY posts.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Fetching posts failed' });
    }

    res.json(results);
  });
});

module.exports = router;