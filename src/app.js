const fs = require('fs');
const path = require('path');
// ============================
const express = require('express');
// ============================
const {
  getActors,
  getActorById,
  createActor,
  updateActor,
  deleteActor,
} = require('./controllers/actorController');

const {
  getDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
} = require('./controllers/directorController');

const app = express();

app.use(express.static(path.resolve('public')));
app.use(express.json()); 

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

// ============================
//  Cinema APP
// ============================

app.get('/actors', getActors);
app.get('/actors/:actorId', getActorById);
app.post('/actors/', createActor);
app.put('/actors/:actorId', updateActor);
app.delete('/actors/:actorId', deleteActor);

app.get('/directors', getDirectors);
app.get('/directors/:directorId', getDirectorById);
app.post('/directors/', createDirector);
app.put('/directors/:directorId', updateDirector);
app.delete('/directors/:directorId', deleteDirector);

module.exports = app;
