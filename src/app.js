const fs = require('fs');
// ============================
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  fs.readFile('./public/index.html', 'utf8', (err, data) => {
    if (err) {
      res.status(404);
      throw err;
    }
    res.set('Content-Type', 'text/html; charset=utf-8').send(data);
  });
});

app.get('/contact', (req, res) => {
  fs.readFile('./public/contact.html', 'utf8', (err, data) => {
    if (err) {
      res.status(404);
      throw err;
    }
    res.set('Content-Type', 'text/html; charset=utf-8').send(data);
  });
});

app.get('/img/*', (req, res) => {
  const url = req.url;
  fs.readFile(`./public${url}`, (err, data) => {
    if (err) {
      res.status(404);
      throw err;
    }
    res
      .set({
        'Content-Type': 'image/jpeg',
        'Content-Type': 'image/png',
        'Content-Type': 'image/gif',
      })
      .send(data);
  });
});

module.exports = app;
