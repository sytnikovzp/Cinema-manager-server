const yup = require('yup');

const {
  PERSON_VALIDATION_SCHEMA,
  MOVIE_VALIDATION_SCHEMA,
  STUDIO_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');

module.exports.validatePerson = async (req, res, next) => {
  const { body } = req;
  try {
    await PERSON_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};

module.exports.validateMovie = async (req, res, next) => {
  const { body } = req;
  try {
    await MOVIE_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};

module.exports.validateStudio = async (req, res, next) => {
  const { body } = req;
  try {
    await STUDIO_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};
