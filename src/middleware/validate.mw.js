const PERSON_VALIDATION_SCHEMA = require('../utils/validationSchemas');

module.exports.validatePerson = async (req, res, next) => {
  const { body } = req;

  try {
    const validatedPerson = await PERSON_VALIDATION_SCHEMA.validate(body, {
      abortEarly: true,
    });
    req.body = validatedPerson;
    next();
  } catch (error) {
    console.log(error);
    next(`Error IS: ${error}`);
  }

  // Promise style
  // PERSON_VALIDATION_SCHEMA.validate(body)
  //   .then((validatedPerson) => {
  //     req.body = validatedPerson;
  //     next();
  //   })
  //   .catch((err) => {
  //     // res.status(500).send(err);
  //     next(`Error IS: ${err}`);
  //   });
};
