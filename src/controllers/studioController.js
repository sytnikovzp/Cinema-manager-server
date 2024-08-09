const createError = require('http-errors');
const moment = require('moment');

const { Movie, Studio, Location, Country, sequelize } = require('../db/models');

class StudioController {
  async getStudios(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const studios = await Studio.findAll({
        attributes: ['id', 'title', 'foundation_year', 'logo'],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      const studiosCount = await Studio.findAll();

      if (studios.length > 0) {
        res.status(200).set('X-Total-Count', studiosCount.length).json(studios);
      } else {
        next(createError(404, 'Studios not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error.message);
    }
  }

  async getStudioById(req, res, next) {
    try {
      const {
        params: { studioId },
      } = req;

      const studioById = await Studio.findByPk(studioId, {
        attributes: {
          exclude: ['locationId', 'location_id'],
        },
        include: [
          {
            model: Location,
            attributes: ['title'],
            include: [
              {
                model: Country,
                attributes: ['title'],
              },
            ],
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

      if (studioById) {
        const formattedStudio = {
          ...studioById.toJSON(),
          location: studioById.Location.title,
          country: studioById.Location.Country.title,
          movies: studioById.Movies,
          createdAt: moment(studioById.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment(studioById.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        };
        delete formattedStudio.Location;
        delete formattedStudio.Movies;

        res.status(200).json(formattedStudio);
      } else {
        console.log('Studio not found!');
        next(createError(404, 'Studio not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createStudio(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { title, location, foundation_year, logo, about } = req.body;

      const locationRecord = await Location.findOne({
        where: {
          title: location,
        },
        attributes: ['id'],
        raw: true,
      });

      if (!locationRecord) {
        throw new Error('Location not found');
      }

      const { id: location_id } = locationRecord;
      console.log(`Location ID is: ${location_id}`);

      const newBody = {
        title,
        location_id,
        foundation_year,
        logo,
        about,
      };

      const newStudio = await Studio.create(newBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newStudio) {
        await t.commit();
        const { id } = newStudio;
        return res.status(201).json({
          id,
          title,
          location_id,
          foundation_year,
          logo,
          about,
        });
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The studio has not been created!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateStudio(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { id, title, location, foundation_year, logo, about } = req.body;

      const locationRecord = await Location.findOne({
        where: {
          title: location,
        },
        attributes: ['id'],
        raw: true,
      });

      if (!locationRecord) {
        throw new Error('Location not found');
      }

      const { id: location_id } = locationRecord;
      console.log(`Location ID is: ${location_id}`);

      const newBody = {
        title,
        location_id,
        foundation_year,
        logo,
        about,
      };

      const updatedStudio = await Studio.update(newBody, {
        where: {
          id: id,
        },
        raw: true,
        returning: [
          'id',
          'title',
          'location_id',
          'foundation_year',
          'logo',
          'about',
        ],
        transaction: t,
      });

      if (updatedStudio) {
        await t.commit();
        res.status(201).json(updatedStudio);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The studio has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async patchStudio(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { studioId },
        body: { title, location, foundation_year, logo, about },
      } = req;

      let location_id;
      if (location) {
        const locationRecord = await Location.findOne({
          where: {
            title: location,
          },
          attributes: ['id'],
          raw: true,
        });

        if (!locationRecord) {
          throw createError(404, 'Location not found');
        }

        location_id = locationRecord.id;
        console.log(`Location ID is: ${location_id}`);
      }

      const newBody = {};
      if (title !== undefined) newBody.title = title;
      if (location_id !== undefined) newBody.location_id = location_id;
      if (foundation_year !== undefined)
        newBody.foundation_year = foundation_year;
      if (logo !== undefined) newBody.logo = logo;
      if (about !== undefined) newBody.about = about;

      const [count, [updatedStudios]] = await Studio.update(newBody, {
        where: {
          id: studioId,
        },
        returning: [
          'id',
          'title',
          'location_id',
          'foundation_year',
          'logo',
          'about',
        ],
        transaction: t,
      });
      console.log(`Count of patched rows: ${count}`);

      if (count > 0) {
        await t.commit();
        res.status(200).json(updatedStudios);
      } else {
        await t.rollback();
        console.log('Studio not found');
        next(createError(404, 'Studio not found'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async deleteStudio(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { studioId },
      } = req;

      const delStudio = await Studio.destroy({
        where: {
          id: studioId,
        },
        transaction: t,
      });

      if (delStudio) {
        await t.commit();
        res.sendStatus(res.statusCode);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The studio has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new StudioController();
