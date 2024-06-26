let movies = [
  {
    id: 1,
    title: 'Indiana Jones: Raiders of the Lost Ark',
    release_year: 1981,
    genre: 'Action',
    directors: ['James Mangold', 'Steven Spielberg'],
    actors: [
      'Harrison Ford',
      'Phoebe Waller-Bridge',
      'Mads Mikkelsen',
      'Shia LaBeouf',
      'Karen Allen',
      'John Rhys-Davies',
      'Philip Stone',
      'Ke Huy Quan',
    ],
    studios: ['Lucasfilm Ltd.'],
    poster:
      'https://upload.wikimedia.org/wikipedia/ru/thumb/8/8b/IJandCrystalSkull.jpg/220px-IJandCrystalSkull.jpg',
    trailer: 'https://www.youtube.com/watch?v=0xQSIdSRlAk',
    storyline:
      'The year is 1936 and the intrepid archaeologist Indiana Jones sets out in search of the fabled Lost Ark of the Covenant, racing a bitter rival and his Nazi cohorts to the prize. Over the course of a hair-raising adventure, Indy endures explosions, spiders, snakes, booby traps, and bad guys in his quest to save the holy relic.',
  },

  {
    id: 2,
    title: 'Alien',
    release_year: 1979,
    genre: 'Horror',
    directors: ['Ridley Scott'],
    actors: [
      'Sigourney Weaver',
      'Tom Skerritt',
      'Veronica Cartwright',
      'John Hurt',
      'Ian Holm',
    ],
    studios: ['20th Century Studios, Inc.'],
    poster:
      'https://upload.wikimedia.org/wikipedia/ru/thumb/c/c3/Alien_movie_poster.jpg/232px-Alien_movie_poster.jpg',
    trailer: 'https://www.youtube.com/watch?v=4v4Kn0J6E-I',
    storyline:
      'Alien, set in the year 2122 CE, tells the story of the deep-space commercial mining ship Nostromo. The ship is on its way back to Earth, carrying a load of extraterrestrial ore, when its crew is awakened from hypersleep, a type of high-tech hibernation, by the ship’s computer, Mother. The ship has intercepted what appears to be a distress signal from an uncharted planetoid, LV-426. Obligated to respond, the crew lands on the planetoid, and several of its members explore the surface. They find a spacecraft with a dead pilot and a cargo of alien eggs. When crew member Kane (John Hurt) inspects an egg that has opened, he is attacked by a face-hugging creature that inserts part of its body down his throat and clings fiercely to his head.',
  },

  {
    id: 3,
    title: 'Aliens',
    release_year: 1986,
    genre: 'Sequel',
    directors: ['James Cameron'],
    actors: [
      'Sigourney Weaver',
      'Bill Paxton',
      'Michael Biehn',
      'Lance Henriksen',
      'Jenette Goldstein',
    ],
    studios: ['20th Century Studios, Inc.'],
    poster:
      'https://upload.wikimedia.org/wikipedia/ru/thumb/f/fb/Aliens_poster.jpg/196px-Aliens_poster.jpg',
    trailer: 'https://www.youtube.com/watch?v=QlztL3cYwHs',
    storyline:
      'Ellen Ripley has been in stasis for 57 years aboard an escape shuttle after destroying her ship, the Nostromo, to escape an alien creature that slaughtered the rest of the crew. She is rescued and debriefed by her employers at the Weyland-Yutani Corporation, who are skeptical about her claim of alien eggs in a derelict ship on the exomoon LV-426, since it is now the site of a terraforming colony.\n\nAfter contact is lost with the colony, Weyland-Yutani representative Carter Burke and Colonial Marine Lieutenant Gorman ask Ripley to accompany them to investigate. Still traumatized by her alien encounter, she agrees on the condition that they exterminate the creatures. Ripley is introduced to the Colonial Marines on the spaceship Sulaco but is distrustful of their android, Bishop, because the android aboard the Nostromo betrayed its crew to protect the alien on company orders.',
  },

  {
    id: 4,
    title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
    release_year: 2003,
    genre: 'Fantasy',
    directors: ['Gore Verbinski'],
    actors: [
      'Johnny Depp',
      'Orlando Bloom',
      'Keira Knightley',
      'Geoffrey Rush',
      'Kevin McNally',
    ],
    studios: ['Walt Disney Pictures'],
    poster:
      'https://upload.wikimedia.org/wikipedia/ru/thumb/7/79/Pirates-of-the-Caribbean-The-Curse-of-the-Black-Pearl-.jpg/201px-Pirates-of-the-Caribbean-The-Curse-of-the-Black-Pearl-.jpg',
    trailer: 'https://www.youtube.com/watch?v=gPBaZpDONgg',
    storyline:
      'In the 18th century, Governor Weatherby Swann and his daughter, Elizabeth, sail aboard HMS Dauntless. Lieutenant Norrington\'s crew recovers a shipwrecked survivor, Will Turner. Elizabeth takes a gold medallion from around Will\'s neck, before seeing a ship with black sails. Eight years later in Port Royal, Jamaica, Norrington is promoted to commodore. While the promotion ceremony is taking place, Captain Jack Sparrow, who initially arrived in Port Royal to "commandeer" a ship, runs into two Royal Navy guards, Murtogg and Mullroy, who reveal to Jack that the HMS Interceptor is the fastest ship in the Caribbean.\n\nAfter the ceremony is finished, Commodore Norrington proposes to Elizabeth, before her corset makes her faint and fall into the water below, causing the medallion to emit a pulse. Jack rescues Elizabeth before escaping Commodore Norrington, who identifies Jack with his pirate brand. Will, now a blacksmith, meets Jack and fights long enough for Sparrow to be imprisoned.',
  },
];

class MovieController {
  getMovies(req, res) {
    res.status(200).send(movies);
  }

  getMovieById(req, res) {
    const {
      params: { movieId },
    } = req;
    const [movie] = movies.filter((movie) => movie.id === Number(movieId));
    if (movie) {
      res.status(200).send(movie);
    } else {
      res.status(404).send('Movie not found');
    }
  }

  createMovie(req, res) {
    const { body } = req;
    console.log(body);
    const newMovie = { ...body };
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }

  updateMovie(req, res) {
    const {
      params: { movieId },
    } = req;
    const { body } = req;
    const newMovie = movies.map((movie) => {
      if (movie.id === Number(movieId)) {
        return { ...body };
      }
      return movie;
    });
    console.log(newMovie);
    movies = newMovie;
    res.status(200).send(body);
  }

  deleteMovie(req, res) {
    const {
      params: { movieId },
    } = req;
    movies = movies.filter((movie) => movie.id !== Number(movieId));
    res.status(204).send('OK');
  }
}

module.exports = new MovieController();
