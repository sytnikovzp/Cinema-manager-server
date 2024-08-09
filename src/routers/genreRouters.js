const { Router } = require('express');
// ============================
const genreController = require('../controllers/genreController');
const {
  validateGenre,
  validatePatchGenre,
} = require('../middleware/validate.mw');

// ============================

const router = new Router();

router
  .route('/')
  .get(genreController.getGenres)
  .post(validateGenre, genreController.createGenre)
  .put(validateGenre, genreController.updateGenre);

router
  .route('/:genreId')
  .get(genreController.getGenreById)
  .delete(genreController.deleteGenre)
  .patch(validatePatchGenre, genreController.patchGenre);


module.exports = router;
