const yup = require('yup');

const PERSON_VALIDATION_SCHEMA = yup.object().shape({
  full_name: yup.string().trim().min(2).max(30).required(),
  birth_year: yup
    .date('This field must be date!')
    .min('1870-01-01')
    .max('2023-01-01')
    .nullable(),
  death_year: yup.date('This field must be date!').nullable(),
});

module.exports = PERSON_VALIDATION_SCHEMA;
