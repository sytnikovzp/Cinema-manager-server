const createError = require('http-errors');

const { Location, Country, sequelize } = require('../db/models');

class LocationController {
  async getLocations(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const locations = await Location.findAll({
        attributes: ['id', 'title', 'coat_of_arms'],
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

      const locationsCount = await Location.count();

      const formattedLocations = locations.map((location) => {
        return {
          id: location.id,
          title: location.title || '',
          coat_of_arms: location.coat_of_arms || '',
          country: location['Country.title'] || '',
        };
      });

      if (formattedLocations.length > 0) {
        res
          .status(200)
          .set('X-Total-Count', locationsCount)
          .json(formattedLocations);
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
      });

      if (locationById) {
        const locationData = locationById.toJSON();
        const formattedLocation = {
          ...locationData,
          title: locationData.title || '',
          coat_of_arms: locationData.coat_of_arms || '',
          country: locationById.Country.title || '',
        };

        delete formattedLocation.Country;

        res.status(200).json(formattedLocation);
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
      const { title, country, coat_of_arms } = req.body;

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

      const newBody = { title, country_id, coat_of_arms };

      const newLocation = await Location.create(newBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newLocation) {
        await t.commit();
        const { id } = newLocation;
        return res.status(201).json({ id, title, country_id, coat_of_arms });
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The location has not been created!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateLocation(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { id, title, country, coat_of_arms } = req.body;

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

      const newBody = { title, country_id, coat_of_arms };

      const updatedLocation = await Location.update(newBody, {
        where: {
          id: id,
        },
        raw: true,
        returning: ['id', 'title', 'country_id', 'coat_of_arms'],
        transaction: t,
      });

      if (updatedLocation) {
        await t.commit();
        res.status(201).json(updatedLocation);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The location has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async patchLocation(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { locationId },
        body: { title, country, coat_of_arms },
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
      if (title !== undefined) newBody.title = title;
      if (country_id !== undefined) newBody.country_id = country_id;
      if (coat_of_arms !== undefined) newBody.coat_of_arms = coat_of_arms;

      const [count, [updatedLocation]] = await Location.update(newBody, {
        where: {
          id: locationId,
        },
        returning: true,
        transaction: t,
      });
      console.log(`Count of patched rows: ${count}`);

      if (count > 0) {
        await t.commit();
        res.status(200).json(updatedLocation);
      } else {
        await t.rollback();
        console.log('Location not found');
        next(createError(400, 'The location has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
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
        await t.commit();
        res.sendStatus(res.statusCode);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The location has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new LocationController();
