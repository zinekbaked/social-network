const express = require('express');
const router = express.Router();
const db = require('../db');


// ADD LIKE
router.post('/', (req, res) => {
  const { post_id, user_id } = req.body;

  const sql = `
    INSERT INTO likes (post_id, user_id)
    VALUES (?, ?)
  `;

  db.query(sql, [post_id, user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Like failed (maybe already liked)' });
    }

    res.json({ message: 'Post liked' });
  });
});


// REMOVE LIKE
router.delete('/', (req, res) => {
  const { post_id, user_id } = req.body;

  const sql = `
    DELETE FROM likes
    WHERE post_id = ? AND user_id = ?
  `;

  db.query(sql, [post_id, user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Unlike failed' });
    }

    res.json({ message: 'Like removed' });
  });
});


// COUNT LIKES
router.get('/:postId', (req, res) => {
  const postId = req.params.postId;

  const sql = `
    SELECT COUNT(*) AS count FROM likes WHERE post_id = ?
  `;

  db.query(sql, [postId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Fetching likes failed' });
    }

    res.json(results[0]);
  });
});

module.exports = router;