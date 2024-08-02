const createError = require('http-errors');

const { Director, Country, sequelize } = require('../db/models');

class DirectorController {
  async getDirectors(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const directors = await Director.findAll({
        attributes: [
          'id',
          'full_name',
          'birth_date',
          'death_date',
          'photo',
          'biography',
        ],
        include: [
          {
            model: Country,
            attributes: ['title'],
          },
        ],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      if (directors.length > 0) {
        console.log(`Result is: ${JSON.stringify(directors, null, 2)}`);
        res.status(200).json(directors);
      } else {
        next(createError(404, 'Directors not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error.message);
    }
  }

  async getDirectorById(req, res, next) {
    try {
      const {
        params: { directorId },
      } = req;

      const directorById = await Director.findByPk(directorId, {
        attributes: {
          exclude: ['countryId', 'country_id'],
        },
        include: [
          {
            model: Country,
            attributes: ['title'],
          },
        ],
        raw: true,
      });

      if (directorById) {
        console.log(`Result is: ${JSON.stringify(directorById, null, 2)}`);
        res.status(200).json(directorById);
      } else {
        console.log('Director not found!');
        next(createError(404, 'Director not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createDirector(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { full_name, country, birth_date, death_date, photo, biography } =
        req.body;

      const countryId = await Country.findOne({
        where: {
          title: country,
        },
        attributes: ['id'],
        raw: true,
      });
      const { id: country_id } = countryId;
      console.log(`Country ID is: ${country_id}`);

      const newBody = {
        full_name,
        country_id,
        birth_date,
        death_date,
        photo,
        biography,
      };
      const newDirector = await Director.create(newBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newDirector) {
        console.log(`Result is: ${JSON.stringify(newDirector, null, 2)}`);
        res.status(201).json(newDirector);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The director has not been created!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateDirector(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        id,
        full_name,
        country,
        birth_date,
        death_date,
        photo,
        biography,
      } = req.body;

      const countryId = await Country.findOne({
        where: {
          title: country,
        },
        attributes: ['id'],
        raw: true,
      });
      const { id: country_id } = countryId;
      console.log(`Country ID is: ${country_id}`);

      const newBody = {
        full_name,
        country_id,
        birth_date,
        death_date,
        photo,
        biography,
      };
      const updatedDirector = await Director.update(newBody, {
        where: {
          id: id,
        },
        raw: true,
        returning: [
          'id',
          'full_name',
          'country_id',
          'birth_date',
          'death_date',
          'photo',
          'biography',
        ],
        transaction: t,
      });

      if (updatedDirector) {
        console.log(`Result is: ${JSON.stringify(updatedDirector, null, 2)}`);
        res.status(201).json(updatedDirector);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The director has not been updated!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async patchDirector(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { directorId },
        body: { full_name, country, birth_date, death_date, photo, biography },
      } = req;

      let country_id;
      if (country) {
        const countryRecord = await Country.findOne({
          where: {
            title: country,
          },
          attributes: ['id'],
          raw: true,
        });

        if (!countryRecord) {
          throw createError(404, 'Country not found');
        }

        country_id = countryRecord.id;
        console.log(`Country ID is: ${country_id}`);
      }

      const newBody = {
        ...(full_name && { full_name }),
        ...(country_id && { country_id }),
        ...(birth_date && { birth_date }),
        ...(death_date && { death_date }),
        ...(photo && { photo }),
        ...(biography && { biography }),
      };

      const [count, [updatedDirectors]] = await Director.update(newBody, {
        where: {
          id: directorId,
        },
        returning: [
          'id',
          'full_name',
          'country_id',
          'birth_date',
          'death_date',
          'photo',
          'biography',
        ],
        raw: true,
        transaction: t,
      });
      console.log(count);
      console.log(updatedDirectors);

      if (count > 0) {
        console.log(`Result is: ${JSON.stringify(updatedDirectors, null, 2)}`);
        res.status(200).json(updatedDirectors);
      } else {
        console.log('Directors not found');
        next(createError(404, 'Directors not found'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async deleteDirector(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { directorId },
      } = req;

      const delDirector = await Director.destroy({
        where: {
          id: directorId,
        },
        transaction: t,
      });

      if (delDirector) {
        console.log(res.statusCode);
        res.sendStatus(res.statusCode);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The director has not been deleted!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new DirectorController();
