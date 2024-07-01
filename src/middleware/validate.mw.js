const yup = require('yup');

const {
  PERSON_VALIDATION_SCHEMA,
  MOVIE_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');

module.exports.validatePerson = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedPerson = await PERSON_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    req.body = validatedPerson;
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};

module.exports.validateMovie = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedMovie = await MOVIE_VALIDATION_SCHEMA.validate(body, {
      abortEarly: false,
    });
    req.body = validatedMovie;
    next();
  } catch (error) {
    console.log(error.errors);
    next(`Error IS: ${error.errors}`);
  }
};
