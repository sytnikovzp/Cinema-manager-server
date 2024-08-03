const yup = require('yup');

const {
  GENRE_VALIDATION_SCHEMA,
  COUNTRY_VALIDATION_SCHEMA,
  LOCATION_VALIDATION_SCHEMA,
  NEW_PERSON_VALIDATION_SCHEMA,
  PATCH_PERSON_VALIDATION_SCHEMA,
  NEW_MOVIE_VALIDATION_SCHEMA,
  PATCH_MOVIE_VALIDATION_SCHEMA,
  NEW_STUDIO_VALIDATION_SCHEMA,
  PATCH_STUDIO_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');

module.exports.validateGenre = async (req, res, next) => {
  const { body } = req;
  try {
    await GENRE_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.errors);
    next(error);
  }
};

module.exports.validateCountry = async (req, res, next) => {
  const { body } = req;
  try {
    await COUNTRY_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.errors);
    next(error);
  }
};

module.exports.validateLocation = async (req, res, next) => {
  const { body } = req;
  try {
    await LOCATION_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.errors);
    next(error);
  }
};

module.exports.validatePerson = async (req, res, next) => {
  const { body } = req;
  try {
    await NEW_PERSON_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.errors);
    next(error);
  }
};

module.exports.validatePatchPerson = async (req, res, next) => {
  const { body } = req;
  try {
    await PATCH_PERSON_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.errors);
    next(error);
  }
};

module.exports.validateMovie = async (req, res, next) => {
  const { body } = req;
  try {
    await NEW_MOVIE_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.errors);
    next(error);
  }
};

module.exports.validatePatchMovie = async (req, res, next) => {
  const { body } = req;
  try {
    await PATCH_MOVIE_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.errors);
    next(error);
  }
};

module.exports.validateStudio = async (req, res, next) => {
  const { body } = req;
  try {
    await NEW_STUDIO_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.errors);
    next(error);
  }
};

module.exports.validatePatchStudio = async (req, res, next) => {
  const { body } = req;
  try {
    await PATCH_STUDIO_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.errors);
    next(error);
  }
};
