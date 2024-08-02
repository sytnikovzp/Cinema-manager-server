const { Router } = require('express');
// ============================
const movieActorController = require('../controllers/movieActorController');
const { validateMovieActor } = require('../middleware/validate.mw');

// ============================

const router = new Router();

router
  .route('/')
  .get(movieActorController.getMovieActors)
  .post(validateMovieActor, movieActorController.createMovieActor)
  .put(validateMovieActor, movieActorController.updateMovieActor);

router
  .route('/:movieActorId')
  .get(movieActorController.getMovieActorById)
  .delete(movieActorController.deleteMovieActor)
  .patch(validateMovieActor, movieActorController.patchMovieActor);

module.exports = router;
