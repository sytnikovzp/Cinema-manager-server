const yup = require('yup');

const TITLE_NAME_SCHEMA = yup
  .string()
  .trim()
  .min(2)
  .max(30)
  .matches(/^[A-Z](\w+\s?){1,50}\w+$/);

const ID_SCHEMA = yup
  .number('This field must be a nubmer!')
  .integer('This field must be integer!')
  .positive('This field must be more than 0!');

const BIRTH_DATE_SCHEMA = yup
  .date('This field must be date!')
  .min('1870-01-01')
  .max('2024-01-01')
  .nullable();

const DEATH_DATE_SCHEMA = yup.date('This field must be date!').nullable();

const RELEASE_FOUNDATION_YEAR_SCHEMA = yup
  .number('This field must be a nubmer!')
  .integer('This field must be integer!')
  .positive('This field must be more than 0!')
  .min(1800)
  .max(2024)
  .nullable();

const URL_RESOURCE_SCHEMA = yup.string().url().nullable();

const STRING_NULLABLE_SCHEMA = yup.string().nullable();

// ======================================================

const NEW_GENRE_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  logo: URL_RESOURCE_SCHEMA,
});

const PATCH_GENRE_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  logo: URL_RESOURCE_SCHEMA,
});

const NEW_COUNTRY_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  flag: URL_RESOURCE_SCHEMA,
});

const PATCH_COUNTRY_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  flag: URL_RESOURCE_SCHEMA,
});

const NEW_LOCATION_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  country_id: ID_SCHEMA,
  coat_of_arms: URL_RESOURCE_SCHEMA,
});

const PATCH_LOCATION_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  country_id: ID_SCHEMA,
  coat_of_arms: URL_RESOURCE_SCHEMA,
});

const NEW_PERSON_VALIDATION_SCHEMA = yup.object().shape({
  full_name: TITLE_NAME_SCHEMA.required(),
  country_id: ID_SCHEMA,
  birth_date: BIRTH_DATE_SCHEMA,
  death_date: DEATH_DATE_SCHEMA,
  photo: URL_RESOURCE_SCHEMA,
  biography: STRING_NULLABLE_SCHEMA,
});

const PATCH_PERSON_VALIDATION_SCHEMA = yup.object().shape({
  full_name: TITLE_NAME_SCHEMA,
  country_id: ID_SCHEMA,
  birth_date: BIRTH_DATE_SCHEMA,
  death_date: DEATH_DATE_SCHEMA,
  photo: URL_RESOURCE_SCHEMA,
  biography: STRING_NULLABLE_SCHEMA,
});

const NEW_MOVIE_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  genre_id: ID_SCHEMA,
  release_year: RELEASE_FOUNDATION_YEAR_SCHEMA,
  poster: URL_RESOURCE_SCHEMA,
  trailer: URL_RESOURCE_SCHEMA,
});

const PATCH_MOVIE_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  genre_id: ID_SCHEMA,
  release_year: RELEASE_FOUNDATION_YEAR_SCHEMA,
  poster: URL_RESOURCE_SCHEMA,
  trailer: URL_RESOURCE_SCHEMA,
  storyline: STRING_NULLABLE_SCHEMA,
});

const NEW_STUDIO_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  location_id: ID_SCHEMA,
  foundation_year: RELEASE_FOUNDATION_YEAR_SCHEMA,
  logo: URL_RESOURCE_SCHEMA,
  about: STRING_NULLABLE_SCHEMA,
});

const PATCH_STUDIO_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA,
  location_id: ID_SCHEMA,
  foundation_year: RELEASE_FOUNDATION_YEAR_SCHEMA,
  logo: URL_RESOURCE_SCHEMA,
  about: yup.string().nullable(),
});

const PAGINATION_SCHEMA = yup.object().shape({
  limit: yup.number().min(1).max(100).required(),
  offset: yup.number().min(0).required(),
});

module.exports = {
  NEW_GENRE_VALIDATION_SCHEMA,
  PATCH_GENRE_VALIDATION_SCHEMA,
  NEW_COUNTRY_VALIDATION_SCHEMA,
  PATCH_COUNTRY_VALIDATION_SCHEMA,
  NEW_LOCATION_VALIDATION_SCHEMA,
  PATCH_LOCATION_VALIDATION_SCHEMA,
  NEW_PERSON_VALIDATION_SCHEMA,
  PATCH_PERSON_VALIDATION_SCHEMA,
  NEW_MOVIE_VALIDATION_SCHEMA,
  PATCH_MOVIE_VALIDATION_SCHEMA,
  NEW_STUDIO_VALIDATION_SCHEMA,
  PATCH_STUDIO_VALIDATION_SCHEMA,
  PAGINATION_SCHEMA,
};
