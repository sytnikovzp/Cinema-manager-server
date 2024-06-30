const { Router } = require('express');
// ============================
const directorController = require('../controllers/directorController');
const { validatePerson } = require('../middleware/validate.mw');
// ============================

const router = new Router();

router
  .route('/')
  .get(directorController.getDirectors)
  .post(validatePerson, directorController.createDirector)
  .put(directorController.updateDirector);

router
  .route('/:directorId')
  .get(directorController.getDirectorById)
  .delete(directorController.deleteDirector);

module.exports = router;
