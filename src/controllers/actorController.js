const createError = require('http-errors');
const moment = require('moment');

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
          country: actor['Country.title'],
        };
      });

      if (formattedActors.length > 0) {
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
          country: actorById.Country.title,
          movies: actorById.Movies,
          createdAt: moment(actorById.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment(actorById.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        };
        delete formattedActor.Country;
        delete formattedActor.Movies;

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

      const newActor = await Actor.create(newBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newActor) {
        await t.commit();
        const { id } = newActor;
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
        next(createError(400, 'The actor has not been created!'));
      }
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
        await t.commit();
        res.status(201).json(updatedActor);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The actor has not been updated!'));
      }
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
        transaction: t,
      });
      console.log(`Count of patched rows: ${count}`);

      if (count > 0) {
        await t.commit();
        res.status(200).json(updatedActors);
      } else {
        await t.rollback();
        console.log('Actor not found');
        next(createError(404, 'Actor not found'));
      }
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
        await t.commit();
        res.sendStatus(res.statusCode);
      } else {
        await t.rollback();
        console.log(`Bad request.`);
        next(createError(400, 'The actor has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new ActorController();
