const db = require('../../db');

class DirectorController {
  async getDirectors(req, res) {
    try {
      const directors = await db.query(
        `SELECT full_name, birth_year, director_id FROM directors ORDER_BY director_id`
      );
      console.log(directors.rows);
      res.json(directors.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getDirectorById(req, res) {
    try {
      const {
        params: { directorId },
      } = req;
      const director = await db.query(`
        SELECT director_id, full_name, birth_year, death_year, foto, nat.description as country
        FROM directors
        JOIN nationalities as nat
        USING (nationality_id)
        WHERE director_id=$1, [directorId]
        `);
      console.log(director.rows[0]);
      res.json(director.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async createDirector(req, res) {
    try {
      const { full_name, birth_year, death_year, foto, nationality } = req.body;
      const newDirector = await db.query(
        `
      INSERT INTO directors (full_name, birth_year, death_year, foto, nationality_id)
      VALUES ($1, $2, $3, $4, (SELECT nationality_id FROM nationalities WHERE title = $5)) RETURNING *
      `,
        [full_name, birth_year, death_year, foto, nationality]
      );
      console.log(newDirector);
      res.json(newDirector.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async updateDirector(req, res) {
    try {
      const {
        director_id,
        full_name,
        birth_year,
        death_year,
        foto,
        nationality,
      } = req.body;
      const updateDirector = await db.query(
        `
        UPDATE directors
        SET full_name=$2, birth_year=$3, death_year=$4, foto=$5, nationality=(SELECT nationality_id FROM nationalities WHERE title=$6), WHERE director_id=$1 RETURNING *
        `,
        [director_id, full_name, birth_year, death_year, foto, nationality]
      );
      res.json(updateDirector.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDirector(req, res) {
    try {
      const {
        params: { directorID },
      } = req;
      const delDirector = await db.query(
        `
        DELETE FROM directors WHERE director_id=$1 RETURNING full_name, director_id
        `,
        [directorID]
      );
      res.json(delDirector.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new DirectorController();
