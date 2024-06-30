const path = require('path');
// ============================
const express = require('express');
// ============================
const {
  errorHandlers: { validationErrorHandler, errorHandler },
  time: { getTime, showTime },
} = require('./middleware');
// ============================
const router = require('./routers');

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
app.use(validationErrorHandler, errorHandler);

app.use('/api', router);

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
