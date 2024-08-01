const yup = require('yup');

// ======================================================

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

const PHOTO_LOGO_POSTER_TRAILER_SCHEMA = yup.string().url().nullable();

// ======================================================

const GENRE_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
});

const COUNTRY_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  code: yup.string().nullable(),
});

const LOCATION_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  country_id: ID_SCHEMA,
});

const PERSON_VALIDATION_SCHEMA = yup.object().shape({
  full_name: TITLE_NAME_SCHEMA.required(),
  country_id: ID_SCHEMA,
  birth_date: BIRTH_DATE_SCHEMA,
  death_date: DEATH_DATE_SCHEMA,
  photo: PHOTO_LOGO_POSTER_TRAILER_SCHEMA,
  biography: yup.string().nullable(),
});

const MOVIE_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  genre_id: ID_SCHEMA,
  release_year: RELEASE_FOUNDATION_YEAR_SCHEMA,
  poster: PHOTO_LOGO_POSTER_TRAILER_SCHEMA,
  trailer: PHOTO_LOGO_POSTER_TRAILER_SCHEMA,
});

const STUDIO_VALIDATION_SCHEMA = yup.object().shape({
  title: TITLE_NAME_SCHEMA.required(),
  location_id: ID_SCHEMA,
  foundation_year: RELEASE_FOUNDATION_YEAR_SCHEMA,
  logo: PHOTO_LOGO_POSTER_TRAILER_SCHEMA,
  about: yup.string().nullable(),
});

// ======================================================

// const NEW_BOOK_VALIDATION_SCHEMA = yup.object().shape({
//   title: TITLE_NAME_SCHEMA.required(),
//   genre_id: ID_SCHEMA,
//   shelf_id: ID_SCHEMA,
// });

// const PATCH_BOOK_VALIDATION_SCHEMA = yup.object().shape({
//   title: TITLE_NAME_SCHEMA,
//   genre_id: ID_SCHEMA,
//   shelf_id: ID_SCHEMA,
// });

const PAGINATION_SCHEMA = yup.object().shape({
  limit: yup.number().min(1).max(100).required(),
  offset: yup.number().min(0).required(),
});

module.exports = {
  GENRE_VALIDATION_SCHEMA,
  COUNTRY_VALIDATION_SCHEMA,
  LOCATION_VALIDATION_SCHEMA,
  PERSON_VALIDATION_SCHEMA,
  MOVIE_VALIDATION_SCHEMA,
  STUDIO_VALIDATION_SCHEMA,
  PAGINATION_SCHEMA,
};
