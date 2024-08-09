const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/protected-route', auth, (req, res) => {
  res.json({ message: 'Protected route accessed', userId: req.user });
});

module.exports = router;
