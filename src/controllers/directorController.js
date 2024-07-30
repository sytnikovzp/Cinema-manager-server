const createError = require('http-errors');

const {
  Sequelize: { Op },
  sequelize,
} = require('../db/models');

class DirectorController {
  async getDirectors(req, res) {
    try {
      const directors = await db.query(
        `SELECT full_name, birth_year, director_id FROM directors ORDER BY director_id`
      );

      if (directors.rows.length > 0) {
        res.status(200).json(directors.rows);
      } else {
        res.status(404).send('Directors not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getDirectorById(req, res) {
    try {
      const {
        params: { directorId },
      } = req;
      const director = await db.query(
        `SELECT director_id, full_name, birth_year, death_year, foto, nat.description as country
        FROM directors
        JOIN nationalities as nat
        USING (nationality_id)
        WHERE director_id=$1`,
        [directorId]
      );

      if (director.rows.length > 0) {
        res.status(200).json(director.rows[0]);
      } else {
        res.status(404).send('Director not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createDirector(req, res) {
    try {
      const { full_name, birth_year, death_year, foto, nationality } = req.body;
      const newDirector = await db.query(
        `INSERT INTO directors (full_name, birth_year, death_year, foto, nationality_id)
        VALUES ($1, $2, $3, $4, (SELECT nationality_id FROM nationalities WHERE title=$5)) RETURNING *`,
        [full_name, birth_year, death_year, foto, nationality]
      );

      if (newDirector.rows.length > 0) {
        res.status(201).json(newDirector.rows[0]);
      } else {
        res.status(404).send('The director has not been created');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateDirector(req, res) {
    try {
      const {
        full_name,
        birth_year,
        death_year,
        foto,
        nationality,
        director_id,
      } = req.body;
      const updatedDirector = await db.query(
        `UPDATE directors
        SET full_name=$1, birth_year=$2, death_year=$3, foto=$4, 
        nationality_id=(SELECT nationality_id FROM nationalities WHERE title=$5) WHERE director_id=$6 RETURNING *`,
        [full_name, birth_year, death_year, foto, nationality, director_id]
      );

      if (updatedDirector.rows.length > 0) {
        res.status(201).json(updatedDirector.rows[0]);
      } else {
        res.status(404).send('Director not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteDirector(req, res) {
    try {
      const {
        params: { directorId },
      } = req;
      const delDirector = await db.query(
        `DELETE FROM directors WHERE director_id=$1 RETURNING full_name, director_id`,
        [directorId]
      );

      if (delDirector.rows.length > 0) {
        res.status(204).json(delDirector.rows[0]);
      } else {
        res.status(404).send('Director not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new DirectorController();
