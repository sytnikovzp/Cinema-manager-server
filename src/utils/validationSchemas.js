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

const MOVIE_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().trim().min(2).max(30).required(),
  release_year: yup
    .date('This field must be date!')
    .min('1870-01-01')
    .max('2024-07-01')
    .nullable(),
  poster: yup.string().url().nullable(),
});

module.exports = { PERSON_VALIDATION_SCHEMA, MOVIE_VALIDATION_SCHEMA };
