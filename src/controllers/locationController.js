const createError = require('http-errors');

const { Location, Country, sequelize } = require('../db/models');

class LocationController {
  async getLocations(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const locations = await Location.findAll({
        attributes: ['id', 'title'],
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

      if (locations.length > 0) {
        console.log(`Result is: ${JSON.stringify(locations, null, 2)}`);
        res.status(200).json(locations);
      } else {
        next(createError(404, 'Locations not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error.message);
    }
  }

  async getLocationById(req, res, next) {
    try {
      const {
        params: { locationId },
      } = req;

      const locationById = await Location.findByPk(locationId, {
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

      if (locationById) {
        console.log(`Result is: ${JSON.stringify(locationById, null, 2)}`);
        res.status(200).json(locationById);
      } else {
        console.log('Location not found!');
        next(createError(404, 'Location not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createLocation(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { title, country } = req.body;

      const countryId = await Country.findOne({
        where: {
          title: country,
        },
        attributes: ['id'],
        raw: true,
      });
      const { id: country_id } = countryId;
      console.log(`Country ID is: ${country_id}`);

      const newBody = { title, country_id };
      const newLocation = await Location.create(newBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newLocation) {
        console.log(`Result is: ${JSON.stringify(newLocation, null, 2)}`);
        res.status(201).json(newLocation);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The location has not been created!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateLocation(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { id, title, country } = req.body;

      const countryId = await Country.findOne({
        where: {
          title: country,
        },
        attributes: ['id'],
        raw: true,
      });
      const { id: country_id } = countryId;
      console.log(`Country ID is: ${country_id}`);
      
      const newBody = { title, country_id };
      const updatedLocation = await Location.update(newBody, {
        where: {
          id: id,
        },
        raw: true,
        returning: ['id', 'title', 'country_id'],
        transaction: t,
      });

      if (updatedLocation) {
        console.log(`Result is: ${JSON.stringify(updatedLocation, null, 2)}`);
        res.status(201).json(updatedLocation);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The location has not been updated!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteLocation(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { locationId },
      } = req;

      const delLocation = await Location.destroy({
        where: {
          id: locationId,
        },
        transaction: t,
      });

      if (delLocation) {
        console.log(res.statusCode);
        res.sendStatus(res.statusCode);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The location has not been deleted!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new LocationController();
