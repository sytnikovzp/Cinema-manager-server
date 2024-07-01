const { Router } = require('express');
// ============================
const movieController = require('../controllers/movieController');
const { validateMovie } = require('../middleware/validate.mw');
// ============================

const router = new Router();

router
  .route('/')
  .get(movieController.getMovies)
  .post(validateMovie, movieController.createMovie)
  .put(validateMovie, movieController.updateMovie);

router
  .route('/:movieId')
  .get(movieController.getMovieById)
  .delete(movieController.deleteMovie);

module.exports = router;
