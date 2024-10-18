const express = require('express');
const router = express.Router();

// Define the /tasks route
router.get('/tasks', (req, res) => {
  res.json({ message: 'Tasks route works!' });
});

module.exports = router;