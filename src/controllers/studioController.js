const createError = require('http-errors');

const { Studio, Location, sequelize } = require('../db/models');

class StudioController {
  async getStudios(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const studios = await Studio.findAll({
        attributes: ['id', 'title', 'foundation_year', 'logo', 'about'],
        include: [
          {
            model: Location,
            attributes: ['title'],
          },
        ],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      if (studios.length > 0) {
        console.log(`Result is: ${JSON.stringify(studios, null, 2)}`);
        res.status(200).json(studios);
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
          },
        ],
        raw: true,
      });

      if (studioById) {
        console.log(`Result is: ${JSON.stringify(studioById, null, 2)}`);
        res.status(200).json(studioById);
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

      const locationId = await Location.findOne({
        where: {
          title: location,
        },
        attributes: ['id'],
        raw: true,
      });
      const { id: location_id } = locationId;
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
        console.log(`Result is: ${JSON.stringify(newStudio, null, 2)}`);
        res.status(201).json(newStudio);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The studio has not been created!'));
      }
      await t.commit();
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

      const locationId = await Location.findOne({
        where: {
          title: location,
        },
        attributes: ['id'],
        raw: true,
      });
      const { id: location_id } = locationId;
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
        console.log(`Result is: ${JSON.stringify(updatedStudio, null, 2)}`);
        res.status(201).json(updatedStudio);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The studio has not been updated!'));
      }
      await t.commit();
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

      const newBody = {
        ...(title && { title }),
        ...(location_id && { location_id }),
        ...(foundation_year && { foundation_year }),
        ...(logo && { logo }),
        ...(about && { about }),
      };

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
        raw: true,
        transaction: t,
      });
      console.log(count);
      console.log(updatedStudios);

      if (count > 0) {
        console.log(`Result is: ${JSON.stringify(updatedStudios, null, 2)}`);
        res.status(200).json(updatedStudios);
      } else {
        console.log('Studios not found');
        next(createError(404, 'Studios not found'));
      }
      await t.commit();
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
        console.log(res.statusCode);
        res.sendStatus(res.statusCode);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The studio has not been deleted!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new StudioController();
