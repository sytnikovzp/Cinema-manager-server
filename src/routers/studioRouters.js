const { Router } = require('express');
// ============================
const studioController = require('../controllers/studioController');
const { validateStudio } = require('../middleware/validate.mw');
// ============================

const router = new Router();

router
  .route('/')
  .get(studioController.getStudios)
  .post(validateStudio, studioController.createStudio)
  .put(studioController.updateStudio);

router
  .route('/:studioId')
  .get(studioController.getStudioById)
  .delete(studioController.deleteStudio);

module.exports = router;
