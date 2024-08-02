const createError = require('http-errors');

const { Country, sequelize } = require('../db/models');

class CountryController {
  async getCountries(req, res, next) {
    try {
      const countries = await Country.findAll({
        attributes: ['id', 'title', 'code'],
        raw: true,
      });

      if (countries.length > 0) {
        console.log(`Result is: ${JSON.stringify(countries, null, 2)}`);
        res.status(200).json(countries);
      } else {
        next(createError(404, 'Countries not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error.message);
    }
  }

  async getCountryById(req, res, next) {
    try {
      const {
        params: { countryId },
      } = req;

      const countryById = await Country.findByPk(countryId, {
        raw: true,
      });

      if (countryById) {
        console.log(`Result is: ${JSON.stringify(countryById, null, 2)}`);
        res.status(200).json(countryById);
      } else {
        console.log('Country not found!');
        next(createError(404, 'Country not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createCountry(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { title, code } = req.body;
      const newBody = { title, code };
      const newCountry = await Country.create(newBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newCountry) {
        console.log(`Result is: ${JSON.stringify(newCountry, null, 2)}`);
        res.status(201).json(newCountry);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The country has not been created!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateCountry(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { body } = req;

      const updatedCountry = await Country.update(body, {
        where: {
          id: body.id,
        },
        raw: true,
        returning: ['id', 'title', 'code'],
        transaction: t,
      });

      if (updatedCountry) {
        console.log(`Result is: ${JSON.stringify(updatedCountry, null, 2)}`);
        res.status(201).json(updatedCountry);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The country has not been updated!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async deleteCountry(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { countryId },
      } = req;

      const delCountry = await Country.destroy({
        where: {
          id: countryId,
        },
        transaction: t,
      });

      if (delCountry) {
        console.log(res.statusCode);
        res.sendStatus(res.statusCode);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The country has not been deleted!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new CountryController();
