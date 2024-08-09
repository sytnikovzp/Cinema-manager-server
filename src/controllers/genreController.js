const createError = require('http-errors');

const { Genre, sequelize } = require('../db/models');

class GenreController {
  async getGenres(req, res, next) {
    try {
      const genres = await Genre.findAll({
        attributes: ['id', 'title', 'logo'],
        raw: true,
        order: [['id', 'DESC']],
      });

      if (genres.length > 0) {
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
      const { title, logo } = req.body;
      const newBody = { title, logo };
      const newGenre = await Genre.create(newBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newGenre) {
        await t.commit();
        res.status(201).json(newGenre);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The genre has not been created!'));
      }
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
        returning: ['id', 'title', 'logo'],
        transaction: t,
      });

      if (updatedGenre) {
        await t.commit();
        res.status(201).json(updatedGenre);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The genre has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async patchGenre(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { genreId },
        body: { title, logo },
      } = req;

      const newBody = {};
      if (title !== undefined) newBody.title = title;
      if (logo !== undefined) newBody.logo = logo;

      const [count, [updatedGenre]] = await Genre.update(newBody, {
        where: {
          id: genreId,
        },
        returning: true,
        transaction: t,
      });
      console.log(`Count of patched rows: ${count}`);

      if (count > 0) {
        await t.commit();
        res.status(200).json(updatedGenre);
      } else {
        await t.rollback();
        console.log('Genre not found');
        next(createError(400, 'The genre has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
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
        await t.commit();
        res.sendStatus(res.statusCode);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The genre has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new GenreController();
