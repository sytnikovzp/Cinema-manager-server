const fs = require('fs');
const path = require('path');
// ============================
const express = require('express');
// ============================
const {getTime, showTime} = require('./middleware/time.mw');
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

// ============================
// Get-Show time
// ============================
app.use('/time', getTime, showTime);

// ============================
//  Cinema APP
// ============================

app.get('/actors', getActors);
app.get('/actors/:actorId', getActorById);
app.post('/actors', createActor);
app.put('/actors', updateActor);
app.delete('/actors/:actorId', deleteActor);

app.get('/directors', getDirectors);
app.get('/directors/:directorId', getDirectorById);
app.post('/directors', createDirector);
app.put('/directors', updateDirector);
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
