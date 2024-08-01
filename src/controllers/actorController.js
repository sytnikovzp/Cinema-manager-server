const createError = require('http-errors');

const { Actor, Country, sequelize } = require('../db/models');

class ActorController {
  async getActors(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const actors = await Actor.findAll({
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

      if (actors.length > 0) {
        console.log(`Result is: ${JSON.stringify(actors, null, 2)}`);
        res.status(200).json(actors);
      } else {
        next(createError(404, 'Actors not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error.message);
    }
  }

  async getActorById(req, res, next) {
    try {
      const {
        params: { actorId },
      } = req;

      const actorById = await Actor.findByPk(actorId, {
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'countryId'],
        },
        include: [
          {
            model: Country,
            attributes: ['title'],
          },
        ],
        raw: true,
      });

      if (actorById) {
        console.log(`Result is: ${JSON.stringify(actorById, null, 2)}`);
        res.status(200).json(actorById);
      } else {
        console.log('Actor not found!');
        next(createError(404, 'Actor not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createActor(req, res, next) {
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
      const newActor = await Actor.create(newBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newActor) {
        console.log(`Result is: ${JSON.stringify(newActor, null, 2)}`);
        res.status(201).json(newActor);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The actor has not been created!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateActor(req, res, next) {
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
      const updatedActor = await Actor.update(newBody, {
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

      if (updatedActor) {
        console.log(`Result is: ${JSON.stringify(updatedActor, null, 2)}`);
        res.status(201).json(updatedActor);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The actor has not been updated!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteActor(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { actorId },
      } = req;

      const delActor = await Actor.destroy({
        where: {
          id: actorId,
        },
        transaction: t,
      });

      if (delActor) {
        console.log(res.statusCode);
        res.sendStatus(res.statusCode);
      } else {
        console.log(`Bad request.`);
        next(createError(400, 'The actor has not been deleted!'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new ActorController();
