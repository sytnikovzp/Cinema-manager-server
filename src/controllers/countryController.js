const createError = require('http-errors');

const { Country, sequelize } = require('../db/models');

class CountryController {
  async getCountries(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const countries = await Country.findAll({
        attributes: ['id', 'title', 'flag'],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      const countriesCount = await Country.count();

      const formattedCountries = countries.map((country) => {
        return {
          id: country.id,
          title: country.title || '',
          flag: country.flag || '',
        };
      });

      if (formattedCountries.length > 0) {
        res
          .status(200)
          .set('X-Total-Count', countriesCount)
          .json(formattedCountries);
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

      const countryById = await Country.findByPk(countryId);

      if (countryById) {
        const countryData = countryById.toJSON();
        const formattedCountry = {
          ...countryData,
          title: countryData.title || '',
          flag: countryData.flag || '',
        };

        res.status(200).json(formattedCountry);
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
      const { title, flag } = req.body;
      const newBody = { title, flag };
      const newCountry = await Country.create(newBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newCountry) {
        await t.commit();
        res.status(201).json(newCountry);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The country has not been created!'));
      }
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
        returning: ['id', 'title', 'flag'],
        transaction: t,
      });

      if (updatedCountry) {
        await t.commit();
        res.status(201).json(updatedCountry);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The country has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async patchCountry(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { countryId },
        body: { title, flag },
      } = req;

      const newBody = {};
      if (title !== undefined) newBody.title = title;
      if (flag !== undefined) newBody.flag = flag;

      const [count, [updatedCountry]] = await Country.update(newBody, {
        where: {
          id: countryId,
        },
        returning: true,
        transaction: t,
      });
      console.log(`Count of patched rows: ${count}`);

      if (count > 0) {
        await t.commit();
        res.status(200).json(updatedCountry);
      } else {
        await t.rollback();
        console.log('Country not found');
        next(createError(400, 'The country has not been updated!'));
      }
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
        await t.commit();
        res.sendStatus(res.statusCode);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The country has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new CountryController();
