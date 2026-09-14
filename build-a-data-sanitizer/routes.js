const express = require('express');
const path = require('path');
const { inputCleaner, inputValidator } = require('./middleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect(301, '/form');
});

router.get('/form', (req, res) => {
  res.status(200)
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.post('/submit', inputCleaner, inputValidator, (req, res) => {
  const { username, comment } = req.body;
  res.send(
    `<p>Username (sanitised): ${username}</p><p>Comment (sanitised): ${comment}</p>`
  );
});

module.exports = router;