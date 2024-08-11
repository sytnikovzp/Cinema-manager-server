const createError = require('http-errors');
const moment = require('moment');

const { Director, Movie, Country, sequelize } = require('../db/models');

class DirectorController {
  async getDirectors(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const directors = await Director.findAll({
        attributes: ['id', 'full_name', 'photo'],
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

      const directorsCount = await Director.count();

      const formattedDirectors = directors.map((director) => {
        return {
          id: director.id,
          full_name: director.full_name || '',
          photo: director.photo || '',
          country: director['Country.title'] || '',
        };
      });

      if (formattedDirectors.length > 0) {
        res
          .status(200)
          .set('X-Total-Count', directorsCount)
          .json(formattedDirectors);
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
          {
            model: Movie,
            attributes: ['id', 'title'],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (directorById) {
        const directorData = directorById.toJSON();
        const formattedDirector = {
          ...directorData,
          full_name: directorData.full_name || '',
          birth_date: directorData.birth_date || '',
          death_date: directorData.death_date || '',
          photo: directorData.photo || '',
          biography: directorData.biography || '',
          country: directorData.Country ? directorData.Country.title : '',
          movies: directorData.Movies || [],
          createdAt: moment(directorData.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment(directorData.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        };

        delete formattedDirector.Country;
        delete formattedDirector.Movies;

        res.status(200).json(formattedDirector);
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

      const countryRecord = await Country.findOne({
        where: {
          title: country,
        },
        attributes: ['id'],
        raw: true,
      });

      if (!countryRecord) {
        throw new Error('Country not found');
      }

      const { id: country_id } = countryRecord;
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
        await t.commit();
        const { id } = newDirector;
        return res.status(201).json({
          id,
          full_name,
          country_id,
          birth_date,
          death_date,
          photo,
          biography,
        });
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The director has not been created!'));
      }
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

      const countryRecord = await Country.findOne({
        where: {
          title: country,
        },
        attributes: ['id'],
        raw: true,
      });

      if (!countryRecord) {
        throw new Error('Country not found');
      }

      const { id: country_id } = countryRecord;
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
        await t.commit();
        res.status(201).json(updatedDirector);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The director has not been updated!'));
      }
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
          throw new Error('Country not found');
        }

        country_id = countryRecord.id;
        console.log(`Country ID is: ${country_id}`);
      }

      const newBody = {};
      if (full_name !== undefined) newBody.full_name = full_name;
      if (country_id !== undefined) newBody.country_id = country_id;
      if (birth_date !== undefined) newBody.birth_date = birth_date;
      if (death_date !== undefined) newBody.death_date = death_date;
      if (photo !== undefined) newBody.photo = photo;
      if (biography !== undefined) newBody.biography = biography;

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
        transaction: t,
      });
      console.log(`Count of patched rows: ${count}`);

      if (count > 0) {
        await t.commit();
        res.status(200).json(updatedDirectors);
      } else {
        await t.rollback();
        console.log('Director not found');
        next(createError(404, 'Director not found'));
      }
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
        await t.commit();
        res.sendStatus(res.statusCode);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The director has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new DirectorController();
