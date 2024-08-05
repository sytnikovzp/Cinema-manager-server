const createError = require('http-errors');

const { Actor, Movie, Country, sequelize } = require('../db/models');

class ActorController {
  async getActors(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const actors = await Actor.findAll({
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

      const actorsCount = await Actor.findAll();

      const formattedActors = actors.map((actor) => {
        return {
          id: actor.id,
          full_name: actor.full_name,
          photo: actor.photo,
          nationality: actor['Country.title'],
        };
      });

      if (formattedActors.length > 0) {
        // console.log(`Result is: ${JSON.stringify(formattedActors, null, 2)}`);
        console.log(`============================================================`)
        res
          .status(200)
          .set('X-Total-Count', actorsCount.length)
          .json(formattedActors);
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

      if (actorById) {
        const formattedActor = {
          ...actorById.toJSON(),
          nationality: actorById.Country.title,
        };
        delete formattedActor.Country;

        console.log(`Result is: ${JSON.stringify(formattedActor, null, 2)}`);
        res.status(200).json(formattedActor);
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
      const {
        full_name,
        nationality,
        birth_date,
        death_date,
        photo,
        biography,
      } = req.body;

      const countryId = await Country.findOne({
        where: {
          title: nationality,
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
        nationality,
        birth_date,
        death_date,
        photo,
        biography,
      } = req.body;

      const countryId = await Country.findOne({
        where: {
          title: nationality,
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
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async patchActor(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { actorId },
        body: {
          full_name,
          nationality,
          birth_date,
          death_date,
          photo,
          biography,
        },
      } = req;

      let country_id;
      if (nationality) {
        const countryRecord = await Country.findOne({
          where: {
            title: nationality,
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

      const [count, [updatedActors]] = await Actor.update(newBody, {
        where: {
          id: actorId,
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
      console.log(updatedActors);

      if (count > 0) {
        console.log(`Result is: ${JSON.stringify(updatedActors, null, 2)}`);
        res.status(200).json(updatedActors);
      } else {
        console.log('Actors not found');
        next(createError(404, 'Actors not found'));
      }
      await t.commit();
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
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
