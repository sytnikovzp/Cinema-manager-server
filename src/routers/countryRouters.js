const { Router } = require('express');
// ============================
const countryController = require('../controllers/countryController');
const { validateCountry } = require('../middleware/validate.mw');

// ============================

const router = new Router();

router
  .route('/')
  .get(countryController.getCountries)
  .post(validateCountry, countryController.createCountry)
  .put(validateCountry, countryController.updateCountry);

router
  .route('/:countryId')
  .get(countryController.getCountryById)
  .delete(countryController.deleteCountry);

module.exports = router;
