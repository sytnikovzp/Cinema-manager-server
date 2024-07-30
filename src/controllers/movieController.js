const createError = require('http-errors');

const {
  Sequelize: { Op },
  sequelize,
} = require('../db/models');

class MovieController {
  async getMovies(req, res) {
    try {
      const movies = await db.query(
        `SELECT title, release_year, movie_id FROM movies ORDER BY movie_id`
      );

      if (movies.rows.length > 0) {
        res.status(200).json(movies.rows);
      } else {
        res.status(404).send('Movies not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getMovieById(req, res) {
    try {
      const {
        params: { movieId },
      } = req;
      const movie = await db.query(
        `SELECT movies.movie_id, movies.title, TO_CHAR(movies.release_year, 'YYYY-MM-DD') AS release_year, movies.poster, gen.title AS genre, stud.title AS studio
        FROM movies
        JOIN genres as gen
        USING (genre_id)
        JOIN studios as stud
        USING (studio_id)
        WHERE movie_id = $1`,
        [movieId]
      );

      if (movie.rows.length > 0) {
        res.status(200).json(movie.rows[0]);
      } else {
        res.status(404).send('Movie not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createMovie(req, res) {
    try {
      const { title, release_year, poster, genre, studio } = req.body;
      const newMovie = await db.query(
        `INSERT INTO movies (title, release_year, poster, genre_id, studio_id) 
          VALUES ($1, $2, $3, (SELECT genre_id FROM genres WHERE title = $4), 
          (SELECT studio_id FROM studios WHERE title = $5)) RETURNING *;`,
        [title, release_year, poster, genre, studio]
      );

      if (newMovie.rows.length > 0) {
        res.status(201).json(newMovie.rows[0]);
      } else {
        res.status(404).send('The movie has not been created');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateMovie(req, res) {
    try {
      const { title, release_year, poster, genre, studio, movie_id } = req.body;
      const updatedMovie = await db.query(
        `UPDATE movies
        SET title=$1, release_year=$2, poster=$3, genre_id = (SELECT genre_id FROM genres WHERE title = $4), 
        studio_id = (SELECT studio_id FROM studios WHERE title = $5) WHERE movie_id=$6 RETURNING *`,
        [title, release_year, poster, genre, studio, movie_id]
      );

      if (updatedMovie.rows.length > 0) {
        res.status(201).json(updatedMovie.rows[0]);
      } else {
        res.status(404).send('Movie not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteMovie(req, res) {
    try {
      const {
        params: { movieId },
      } = req;
      const delMovie = await db.query(
        `DELETE FROM movies WHERE movie_id=$1 RETURNING title, movie_id`,
        [movieId]
      );

      if (delMovie.rows.length > 0) {
        res.status(204).json(delMovie.rows[0]);
      } else {
        res.status(404).send('Movie not found');
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new MovieController();
