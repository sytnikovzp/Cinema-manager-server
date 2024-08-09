const { Router } = require('express');
// ============================
const locationController = require('../controllers/locationController');
const {
  validateLocation,
  validatePatchLocation,
} = require('../middleware/validate.mw');

// ============================

const router = new Router();

router
  .route('/')
  .get(locationController.getLocations)
  .post(validateLocation, locationController.createLocation)
  .put(validateLocation, locationController.updateLocation);

router
  .route('/:locationId')
  .get(locationController.getLocationById)
  .delete(locationController.deleteLocation)
  .patch(validatePatchLocation, locationController.patchLocation);

module.exports = router;
