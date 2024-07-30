const createError = require('http-errors');

const {
  Sequelize: { Op },
  sequelize,
} = require('../db/models');

class ActorController {
  async getActors(req, res) {
    try {
      const actors = await db.query(
        `SELECT full_name, birth_year, actor_id FROM actors ORDER BY actor_id`
      );

      if (actors.rows.length > 0) {
        res.status(200).json(actors.rows);
      } else {
        res.status(404).send('Actors not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getActorById(req, res) {
    try {
      const {
        params: { actorId },
      } = req;
      const actor = await db.query(
        `SELECT actor_id, full_name, birth_year, death_year, foto, nat.description as country
        FROM actors
        JOIN nationalities as nat
        USING (nationality_id)
        WHERE actor_id=$1`,
        [actorId]
      );

      if (actor.rows.length > 0) {
        res.status(200).json(actor.rows[0]);
      } else {
        res.status(404).send('Actor not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createActor(req, res) {
    try {
      const { full_name, birth_year, death_year, foto, nationality } = req.body;
      const newActor = await db.query(
        `INSERT INTO actors (full_name, birth_year, death_year, foto, nationality_id)
        VALUES ($1, $2, $3, $4, (SELECT nationality_id FROM nationalities WHERE title=$5)) RETURNING *`,
        [full_name, birth_year, death_year, foto, nationality]
      );

      if (newActor.rows.length > 0) {
        res.status(201).json(newActor.rows[0]);
      } else {
        res.status(404).send('The actor has not been created');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateActor(req, res) {
    try {
      const { full_name, birth_year, death_year, foto, nationality, actor_id } =
        req.body;
      const updatedActor = await db.query(
        `UPDATE actors
        SET full_name=$1, birth_year=$2, death_year=$3, foto=$4, 
        nationality_id=(SELECT nationality_id FROM nationalities WHERE title=$5) WHERE actor_id=$6 RETURNING *`,
        [full_name, birth_year, death_year, foto, nationality, actor_id]
      );

      if (updatedActor.rows.length > 0) {
        res.status(201).json(updatedActor.rows[0]);
      } else {
        res.status(404).send('Actor not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteActor(req, res) {
    try {
      const {
        params: { actorId },
      } = req;
      const delActor = await db.query(
        `DELETE FROM actors WHERE actor_id=$1 RETURNING full_name, actor_id`,
        [actorId]
      );

      if (delActor.rows.length > 0) {
        res.status(204).json(delActor.rows[0]);
      } else {
        res.status(404).send('Actor not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new ActorController();
