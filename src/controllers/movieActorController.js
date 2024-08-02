const createError = require('http-errors');
const {
  MovieActor,
  Movie,
  Actor,
  Director,
  sequelize,
} = require('../db/models');

class MovieActorController {
  async getMovieActors(req, res, next) {
    try {
      const movieActors = await MovieActor.findAll({
        attributes: {
          exclude: ['movie_id', 'actor_id', 'ActorId', 'MovieId'],
        },
        include: [
          { model: Movie, attributes: ['title'] },
          { model: Actor, attributes: ['full_name'] },
        ],
        raw: true,
      });

      if (movieActors.length > 0) {
        console.log(`Result is: ${JSON.stringify(movieActors, null, 2)}`);
        res.status(200).json(movieActors);
      } else {
        next(createError(404, 'MovieActors not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getMovieActorById(req, res, next) {
    try {
      const {
        params: { movieActorId },
      } = req;

      const movieWithDetails = await Movie.findByPk(movieActorId, {
        attributes: {
          exclude: ['ActorId', 'genreId'],
        },
        include: [
          {
            model: Actor,
            attributes: ['full_name'],
            through: { attributes: [] },
          },
        ],
        raw: true,
      });

      if (movieWithDetails) {
        console.log(`Result is: ${JSON.stringify(movieWithDetails, null, 2)}`);
        res.status(200).json(movieWithDetails);
      } else {
        console.log('Movie not found!');
        next(createError(404, 'Movie not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getActorMoviesById(req, res, next) {
    try {
      const {
        params: { actorId },
      } = req;

      console.log(req.params);

      const actorWithMovies = await Actor.findByPk(actorId, {
        attributes: ['full_name'],
        include: [
          {
            model: Movie,
            attributes: ['title'],
            through: { attributes: [] },
          },
        ],
        raw: true,
      });

      if (actorWithMovies) {
        console.log(`Result is: ${JSON.stringify(actorWithMovies, null, 2)}`);
        res.status(200).json(actorWithMovies);
      } else {
        console.log('Actor not found!');
        next(createError(404, 'Actor not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createMovieActor(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { movie_id, actor_id } = req.body;

      const newMovieActor = await MovieActor.create(
        { movie_id, actor_id },
        {
          transaction: t,
        }
      );

      if (newMovieActor) {
        console.log(`Result is: ${JSON.stringify(newMovieActor, null, 2)}`);
        res.status(201).json(newMovieActor);
      } else {
        console.log(`Bad request.`);
        next(
          createError(400, 'The movie-actor association has not been created!')
        );
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateMovieActor(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { movie_id, actor_id } = req.params;
      const { new_movie_id, new_actor_id } = req.body;

      const movieActor = await MovieActor.findOne({
        where: { movie_id, actor_id },
      });

      if (movieActor) {
        movieActor.movie_id = new_movie_id || movieActor.movie_id;
        movieActor.actor_id = new_actor_id || movieActor.actor_id;
        await movieActor.save({ transaction: t });

        console.log(`Result is: ${JSON.stringify(movieActor, null, 2)}`);
        res.status(200).json(movieActor);
      } else {
        console.log(`Bad request.`);
        next(createError(404, 'MovieActor not found!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async patchMovieActor(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { movie_id, actor_id } = req.params;
      const { new_movie_id, new_actor_id } = req.body;

      const movieActor = await MovieActor.findOne({
        where: { movie_id, actor_id },
      });

      if (movieActor) {
        if (new_movie_id) movieActor.movie_id = new_movie_id;
        if (new_actor_id) movieActor.actor_id = new_actor_id;
        await movieActor.save({ transaction: t });

        console.log(`Result is: ${JSON.stringify(movieActor, null, 2)}`);
        res.status(200).json(movieActor);
      } else {
        console.log('Actors not found');
        next(createError(404, 'MovieActor not found!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async deleteMovieActor(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { movie_id, actor_id } = req.params;

      const delMovieActor = await MovieActor.destroy({
        where: { movie_id, actor_id },
        transaction: t,
      });

      if (delMovieActor) {
        console.log(res.statusCode);
        res.sendStatus(res.statusCode);
      } else {
        console.log(`Bad request.`);
        next(
          createError(400, 'The movie-actor association has not been deleted!')
        );
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new MovieActorController();
