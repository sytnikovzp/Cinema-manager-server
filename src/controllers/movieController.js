const createError = require('http-errors');

const {
  Actor,
  Director,
  Movie,
  Studio,
  Genre,
  sequelize,
} = require('../db/models');

class MovieController {
  async getMovies(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const movies = await Movie.findAll({
        attributes: ['id', 'title', 'release_year', 'poster'],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      const moviesCount = await Movie.findAll();

      if (movies.length > 0) {
        res.status(200).set('X-Total-Count', moviesCount.length).json(movies);
      } else {
        next(createError(404, 'Movies not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error.message);
    }
  }

  async getMovieById(req, res, next) {
    try {
      const {
        params: { movieId },
      } = req;

      const movieById = await Movie.findByPk(movieId, {
        attributes: {
          exclude: ['genreId', 'genre_id'],
        },
        include: [
          {
            model: Genre,
            attributes: ['title'],
          },
          {
            model: Actor,
            attributes: ['id', 'full_name'],
            through: {
              attributes: [],
            },
          },
          {
            model: Director,
            attributes: ['id', 'full_name'],
            through: {
              attributes: [],
            },
          },
          {
            model: Studio,
            attributes: ['id', 'title'],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (movieById) {
        const formattedMovie = {
          ...movieById.toJSON(),
          genre: movieById.Genre.title,
          studios: movieById.Studios.map((studio) => ({
            id: studio.id,
            title: studio.title,
          })),
          directors: movieById.Directors.map((director) => ({
            id: director.id,
            full_name: director.full_name,
          })),
          actors: movieById.Actors.map((actor) => ({
            id: actor.id,
            full_name: actor.full_name,
          })),
        };
        delete formattedMovie.Genre;
        delete formattedMovie.Actors;
        delete formattedMovie.Directors;
        delete formattedMovie.Studios;

        res.status(200).json(formattedMovie);
      } else {
        console.log('Movie not found!');
        next(createError(404, 'Movie not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createMovie(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        title,
        genre,
        release_year,
        poster,
        trailer,
        storyline,
        actors,
        directors,
        studios,
      } = req.body;

      const genreRecord = await Genre.findOne({
        where: { title: genre },
        attributes: ['id'],
        raw: true,
      });

      if (!genreRecord) {
        throw new Error('Genre not found');
      }

      const { id: genre_id } = genreRecord;
      console.log('Genre Id:', genreRecord);

      const actorRecords = await Promise.all(
        actors.map(async (full_name) => {
          const actor = await Actor.findOne({
            where: { full_name },
            attributes: ['id'],
            raw: true,
          });
          return actor ? actor.id : null;
        })
      );
      console.log('Actors Id`s:', actorRecords);

      const directorRecords = await Promise.all(
        directors.map(async (full_name) => {
          const director = await Director.findOne({
            where: { full_name },
            attributes: ['id'],
            raw: true,
          });
          return director ? director.id : null;
        })
      );
      console.log('Directors Id`s:', directorRecords);

      const studioRecords = await Promise.all(
        studios.map(async (title) => {
          const studio = await Studio.findOne({
            where: { title },
            attributes: ['id'],
            raw: true,
          });
          return studio ? studio.id : null;
        })
      );
      console.log('Studios Id`s:', studioRecords);

      const newBody = {
        title,
        genre_id,
        release_year,
        poster,
        trailer,
        storyline,
      };

      const newMovie = await Movie.create(newBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newMovie) {
        if (actorRecords.length > 0) {
          await newMovie.addActors(
            actorRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        if (directorRecords.length > 0) {
          await newMovie.addDirectors(
            directorRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        if (studioRecords.length > 0) {
          await newMovie.addStudios(
            studioRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        await t.commit();
        const { id } = newMovie;
        return res.status(201).json({
          id,
          title,
          genre_id,
          release_year,
          poster,
          trailer,
          storyline,
        });
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The movie has not been created!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateMovie(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        id,
        title,
        genre,
        release_year,
        poster,
        trailer,
        storyline,
        actors,
        directors,
        studios,
      } = req.body;

      const genreRecord = await Genre.findOne({
        where: { title: genre },
        attributes: ['id'],
        raw: true,
      });

      if (!genreRecord) {
        throw new Error('Genre not found');
      }

      const { id: genre_id } = genreRecord;
      console.log('Genre Id:', genreRecord);

      const actorRecords = await Promise.all(
        actors.map(async (full_name) => {
          const actor = await Actor.findOne({
            where: { full_name },
            attributes: ['id'],
            raw: true,
          });
          return actor ? actor.id : null;
        })
      );
      console.log('Actors Id`s:', actorRecords);

      const directorRecords = await Promise.all(
        directors.map(async (full_name) => {
          const director = await Director.findOne({
            where: { full_name },
            attributes: ['id'],
            raw: true,
          });
          return director ? director.id : null;
        })
      );
      console.log('Directors Id`s:', directorRecords);

      const studioRecords = await Promise.all(
        studios.map(async (title) => {
          const studio = await Studio.findOne({
            where: { title },
            attributes: ['id'],
            raw: true,
          });
          return studio ? studio.id : null;
        })
      );
      console.log('Studios Id`s:', studioRecords);

      const newBody = {
        title,
        genre_id,
        release_year,
        poster,
        trailer,
        storyline,
      };

      const [count, [updatedMovie]] = await Movie.update(newBody, {
        where: { id },
        returning: [
          'id',
          'title',
          'genre_id',
          'release_year',
          'poster',
          'trailer',
          'storyline',
        ],
        transaction: t,
      });

      if (count > 0) {
        const movieInstance = await Movie.findByPk(id, { transaction: t });

        if (actorRecords.length > 0) {
          await movieInstance.setActors(
            actorRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        if (directorRecords.length > 0) {
          await movieInstance.setDirectors(
            directorRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        if (studioRecords.length > 0) {
          await movieInstance.setStudios(
            studioRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        await t.commit();
        return res.status(200).json(updatedMovie);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The movie has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async patchMovie(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { movieId },
        body: {
          title,
          genre,
          release_year,
          poster,
          trailer,
          storyline,
          actors,
          directors,
          studios,
        },
      } = req;

      let genre_id;
      if (genre) {
        const genreRecord = await Genre.findOne({
          where: { title: genre },
          attributes: ['id'],
          raw: true,
        });

        if (!genreRecord) {
          throw createError(404, 'Genre not found');
        }

        genre_id = genreRecord.id;
        console.log('Genre Id:', genreRecord);
      }

      const actorRecords = actors
        ? await Promise.all(
            actors.map(async (full_name) => {
              const actor = await Actor.findOne({
                where: { full_name },
                attributes: ['id'],
                raw: true,
              });
              return actor ? actor.id : null;
            })
          )
        : [];

      console.log('Actors Id`s:', actorRecords);

      const directorRecords = directors
        ? await Promise.all(
            directors.map(async (full_name) => {
              const director = await Director.findOne({
                where: { full_name },
                attributes: ['id'],
                raw: true,
              });
              return director ? director.id : null;
            })
          )
        : [];

      console.log('Directors Id`s:', directorRecords);

      const studioRecords = studios
        ? await Promise.all(
            studios.map(async (title) => {
              const studio = await Studio.findOne({
                where: { title },
                attributes: ['id'],
                raw: true,
              });
              return studio ? studio.id : null;
            })
          )
        : [];

      console.log('Studios Id`s:', studioRecords);

      const newBody = {};
      if (title !== undefined) newBody.title = title;
      if (genre_id !== undefined) newBody.genre_id = genre_id;
      if (release_year !== undefined) newBody.release_year = release_year;
      if (poster !== undefined) newBody.poster = poster;
      if (trailer !== undefined) newBody.trailer = trailer;
      if (storyline !== undefined) newBody.storyline = storyline;

      const [count, [updatedMovie]] = await Movie.update(newBody, {
        where: { id: movieId },
        returning: [
          'id',
          'title',
          'genre_id',
          'release_year',
          'poster',
          'trailer',
          'storyline',
        ],
        transaction: t,
      });

      console.log(`Count of patched rows: ${count}`);

      if (count > 0) {
        const movieInstance = await Movie.findByPk(movieId, { transaction: t });

        if (actors && actorRecords.length > 0) {
          await movieInstance.setActors(
            actorRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        if (directors && directorRecords.length > 0) {
          await movieInstance.setDirectors(
            directorRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        if (studios && studioRecords.length > 0) {
          await movieInstance.setStudios(
            studioRecords.filter((id) => id !== null),
            { transaction: t }
          );
        }

        await t.commit();
        return res.status(200).json(updatedMovie);
      } else {
        await t.rollback();
        console.log('Movie not found');
        next(createError(404, 'Movie not found'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async deleteMovie(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { movieId },
      } = req;

      const delMovie = await Movie.destroy({
        where: {
          id: movieId,
        },
        transaction: t,
      });

      if (delMovie) {
        await t.commit();
        res.sendStatus(res.statusCode);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The movie has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new MovieController();
