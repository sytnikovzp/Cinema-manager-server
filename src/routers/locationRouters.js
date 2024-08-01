const { Router } = require('express');
// ============================
const locationController = require('../controllers/locationController');
const { validateLocation } = require('../middleware/validate.mw');
const { paginate } = require('../middleware');

// ============================

const router = new Router();

router
  .route('/')
  .get(paginate.paginateElements, locationController.getLocations)
  .post(validateLocation, locationController.createLocation)
  .put(validateLocation, locationController.updateLocation);

router
  .route('/:locationId')
  .get(locationController.getLocationById)
  .delete(locationController.deleteLocation);

module.exports = router;
