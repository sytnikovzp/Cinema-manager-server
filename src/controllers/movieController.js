const createError = require('http-errors');

const { Movie, Genre, sequelize } = require('../db/models');

class MovieController {
  async getMovies(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const movies = await Movie.findAll({
        attributes: [
          'id',
          'title',
          'release_year',
          'poster',
          'trailer',
          'storyline',
        ],
        include: [
          {
            model: Genre,
            attributes: ['title'],
          },
        ],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      if (movies.length > 0) {
        console.log(`Result is: ${JSON.stringify(movies, null, 2)}`);
        res.status(200).json(movies);
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
          exclude: ['createdAt', 'updatedAt', 'genreId'],
        },
        include: [
          {
            model: Genre,
            attributes: ['title'],
          },
        ],
        raw: true,
      });

      if (movieById) {
        console.log(`Result is: ${JSON.stringify(movieById, null, 2)}`);
        res.status(200).json(movieById);
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
      const { title, genre, release_year, poster, trailer, storyline } =
        req.body;

      const genreId = await Genre.findOne({
        where: {
          title: genre,
        },
        attributes: ['id'],
        raw: true,
      });
      const { id: genre_id } = genreId;
      console.log(`Genre ID is: ${genre_id}`);

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
        console.log(`Result is: ${JSON.stringify(newMovie, null, 2)}`);
        res.status(201).json(newMovie);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The movie has not been created!'));
      }
      await t.commit();
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
      } = req.body;

      const genreId = await Genre.findOne({
        where: {
          title: genre,
        },
        attributes: ['id'],
        raw: true,
      });
      const { id: genre_id } = genreId;
      console.log(`Genre ID is: ${genre_id}`);

      const newBody = {
        title,
        genre_id,
        release_year,
        poster,
        trailer,
        storyline,
      };
      const updatedMovie = await Movie.update(newBody, {
        where: {
          id: id,
        },
        raw: true,
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

      if (updatedMovie) {
        console.log(`Result is: ${JSON.stringify(updatedMovie, null, 2)}`);
        res.status(201).json(updatedMovie);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The movie has not been updated!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async patchMovie(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { movieId },
        body: { title, genre, release_year, poster, trailer, storyline },
      } = req;

      let genre_id;
      if (genre) {
        const genreRecord = await Genre.findOne({
          where: {
            title: genre,
          },
          attributes: ['id'],
          raw: true,
        });

        if (!genreRecord) {
          throw createError(404, 'Genre not found');
        }

        genre_id = genreRecord.id;
        console.log(`Genre ID is: ${genre_id}`);
      }

      const newBody = {
        ...(title && { title }),
        ...(genre_id && { genre_id }),
        ...(release_year && { release_year }),
        ...(poster && { poster }),
        ...(trailer && { trailer }),
        ...(storyline && { storyline }),
      };

      const [count, [updatedMovies]] = await Movie.update(newBody, {
        where: {
          id: movieId,
        },
        returning: [
          'id',
          'title',
          'genre_id',
          'release_year',
          'poster',
          'trailer',
          'storyline',
        ],
        raw: true,
        transaction: t,
      });
      console.log(count);
      console.log(updatedMovies);

      if (count > 0) {
        console.log(`Result is: ${JSON.stringify(updatedMovies, null, 2)}`);
        res.status(200).json(updatedMovies);
      } else {
        console.log('Movies not found');
        next(createError(404, 'Movies not found'));
      }
      await t.commit();
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
        console.log(res.statusCode);
        res.sendStatus(res.statusCode);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The movie has not been deleted!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new MovieController();
