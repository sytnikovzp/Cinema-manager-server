const { Router } = require('express');
// ============================
const directorController = require('../controllers/directorController');
// ============================

const router = new Router();

router
  .route('/')
  .get(directorController.getDirectors)
  .post(directorController.createDirector)
  .put(directorController.updateDirector);

router
  .route('/:directoriId')
  .get(directorController.getDirectorById)
  .delete(directorController.deleteDirector);

module.exports = router;
