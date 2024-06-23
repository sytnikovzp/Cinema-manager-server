const fs = require('fs');
const path = require('path');
// ============================
const express = require('express');

const app = express();

// Middleware (use)
// app.use(express.static('./public'));
// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.resolve('public'))); // сразу попадаем в корень приложения

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

// app.get('/img/*', (req, res) => {
//   const url = req.url;
//   fs.readFile(`./public${url}`, (err, data) => {
//     if (err) {
//       res.status(404);
//       throw err;
//     }
//     res
//       .set({
//         'Content-Type': 'image/jpeg',
//         'Content-Type': 'image/png',
//         'Content-Type': 'image/gif',
//       })
//       .send(data);
//   });
// });

app.get('/download', (req, res) => {
  console.log('Download');
  console.log(__dirname);
  res.download(path.join(__dirname, 'test', 'text'));
});

app.get('/phones', (req, res) => {
  res.redirect('/contact');
});

app.get('/codes', (req, res) => {
  console.log(req.query);
  const id = req.query.id;
  const code = req.query.code;
  console.log(`Id is ${id}, codes is ${code}`);

  res.send(`Id is ${id}, codes is ${code}`);
});

module.exports = app;
