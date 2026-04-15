const express = require('express');
const router = express.Router();
const db = require('../db');


// CREATE COMMENT
router.post('/', (req, res) => {
  const { post_id, user_id, content } = req.body;

  const sql = `
    INSERT INTO comments (post_id, user_id, content)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [post_id, user_id, content], (err, result) => {
    if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Comment failed', detail: err.message });
    }

    res.json({ message: 'Comment added' });
  });
});


// GET COMMENTS FOR POST
router.get('/:postId', (req, res) => {
  const postId = req.params.postId;

  const sql = `
    SELECT comments.*, social_users.username
    FROM comments
    JOIN social_users ON comments.user_id = social_users.id
    WHERE post_id = ?
    ORDER BY comments.created_at ASC
  `;

  db.query(sql, [postId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Fetching comments failed' });
    }

    res.json(results);
  });
});

module.exports = router;