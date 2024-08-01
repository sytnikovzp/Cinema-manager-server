const createError = require('http-errors');

const { Genre, sequelize } = require('../db/models');

class GenreController {
  async getGenres(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const genres = await Genre.findAll({
        attributes: ['id', 'title'],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      if (genres.length > 0) {
        console.log(`Result is: ${JSON.stringify(genres, null, 2)}`);
        res.status(200).json(genres);
      } else {
        next(createError(404, 'Genres not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error.message);
    }
  }

  async getGenreById(req, res, next) {
    try {
      const {
        params: { genreId },
      } = req;

      const genreById = await Genre.findByPk(genreId, {
        raw: true,
      });

      if (genreById) {
        console.log(`Result is: ${JSON.stringify(genreById, null, 2)}`);
        res.status(200).json(genreById);
      } else {
        console.log('Genre not found!');
        next(createError(404, 'Genre not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createGenre(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { title } = req.body;
      const newBody = { title };
      const newGenre = await Genre.create(newBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newGenre) {
        console.log(`Result is: ${JSON.stringify(newGenre, null, 2)}`);
        res.status(201).json(newGenre);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The genre has not been created!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateGenre(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { body } = req;
      const updatedGenre = await Genre.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        returning: ['id', 'title'],
        transaction: t,
      });

      if (updatedGenre) {
        console.log(`Result is: ${JSON.stringify(updatedGenre, null, 2)}`);
        res.status(201).json(updatedGenre);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The genre has not been updated!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteGenre(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { genreId },
      } = req;

      const delGenre = await Genre.destroy({
        where: {
          id: genreId,
        },
        transaction: t,
      });

      if (delGenre) {
        console.log(res.statusCode);
        res.sendStatus(res.statusCode);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The genre has not been deleted!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new GenreController();
