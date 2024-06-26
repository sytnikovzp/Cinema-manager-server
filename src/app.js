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

const {
  getStudios,
  getStudioById,
  createStudio,
  updateStudio,
  deleteStudio,
} = require('./controllers/studioController');

const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('./controllers/movieController');

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

app.get('/studios', getStudios);
app.get('/studios/:studioId', getStudioById);
app.post('/studios/', createStudio);
app.put('/studios/:studioId', updateStudio);
app.delete('/studios/:studioId', deleteStudio);

app.get('/movies', getMovies);
app.get('/movies/:movieId', getMovieById);
app.post('/movies/', createMovie);
app.put('/movies/:movieId', updateMovie);
app.delete('/movies/:movieId', deleteMovie);

module.exports = app;
