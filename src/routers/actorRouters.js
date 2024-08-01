const { Router } = require('express');
// ============================
const actorController = require('../controllers/actorController');
const { validatePerson } = require('../middleware/validate.mw');
const { paginate } = require('../middleware');

// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, actorController.getActors)
  .post(validatePerson, actorController.createActor)
  .put(validatePerson, actorController.updateActor);

router
  .route('/:actorId')
  .get(actorController.getActorById)
  .delete(actorController.deleteActor);

module.exports = router;
