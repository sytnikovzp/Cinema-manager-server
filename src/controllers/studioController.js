const createError = require('http-errors');

const {
  Sequelize: { Op },
  sequelize,
} = require('../db/models');

class StudioController {
  async getStudios(req, res) {
    try {
      const studios = await db.query(
        `SELECT title, found_year, logo, location_id FROM studios ORDER BY studio_id`
      );

      if (studios.rows.length > 0) {
        res.status(200).json(studios.rows);
      } else {
        res.status(404).send('Studios not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getStudioById(req, res) {
    try {
      const {
        params: { studioId },
      } = req;
      const studio = await db.query(
        `SELECT studio_id, studios.title, found_year, logo, loc.title as location
        FROM studios
        JOIN locations as loc
        USING (location_id)
        WHERE studio_id=$1`,
        [studioId]
      );

      if (studio.rows.length > 0) {
        res.status(200).json(studio.rows[0]);
      } else {
        res.status(404).send('Studio not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createStudio(req, res) {
    try {
      const { title, found_year, logo, location } = req.body;
      const newStudio = await db.query(
        `INSERT INTO studios (title, found_year, logo, location_id)
        VALUES ($1, $2, $3, (SELECT location_id FROM locations WHERE title=$4)) RETURNING *`,
        [title, found_year, logo, location]
      );

      if (newStudio.rows.length > 0) {
        res.status(201).json(newStudio.rows[0]);
      } else {
        res.status(404).send('The studio has not been created');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateStudio(req, res) {
    try {
      const { title, found_year, logo, location, studio_id } = req.body;
      const updatedStudio = await db.query(
        `UPDATE studios
        SET title=$1, found_year=$2, logo=$3,  
        location_id=(SELECT location_id FROM locations WHERE title=$4) WHERE studio_id=$5 RETURNING *`,
        [title, found_year, logo, location, studio_id]
      );

      if (updatedStudio.rows.length > 0) {
        res.status(201).json(updatedStudio.rows[0]);
      } else {
        res.status(404).send('Studio not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteStudio(req, res) {
    try {
      const {
        params: { studioId },
      } = req;
      const delStudio = await db.query(
        `DELETE FROM studios WHERE studio_id=$1 RETURNING title, studio_id`,
        [studioId]
      );

      if (delStudio.rows.length > 0) {
        res.status(204).json(delStudio.rows[0]);
      } else {
        res.status(404).send('Studio not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new StudioController();
