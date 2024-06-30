const { Router } = require('express');
// ============================
const actorController = require('../controllers/actorController');
// ============================

const router = new Router();

router
  .route('/')
  .get(actorController.getActors)
  .post(actorController.createActor)
  .put(actorController.updateActor);

router
  .route('/:actorId')
  .get(actorController.getActorById)
  .delete(actorController.deleteActor);

module.exports = router;
