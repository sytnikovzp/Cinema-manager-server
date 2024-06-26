let directors = [
  {
    id: 1,
    full_name: 'Steven Spielberg',
    nationality: 'United States of America',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ready_Player_One_Japan_Premiere_Red_Carpet_Steven_Spielberg_%2841604920761%29_%28cropped%29.jpg/240px-Ready_Player_One_Japan_Premiere_Red_Carpet_Steven_Spielberg_%2841604920761%29_%28cropped%29.jpg',
    biography:
      "Spielberg was born in Cincinnati, Ohio, and grew up in Phoenix, Arizona. He moved to California and studied film in college. After directing several episodes for television, including Night Gallery and Columbo, he directed the television film Duel (1971), which later received an international theatrical release. He made his theatrical film debut with The Sugarland Express (1974) and became a household name with the 1975 summer blockbuster Jaws. He directed more box office successes with Close Encounters of the Third Kind (1977), E.T. the Extra-Terrestrial (1982), and the original Indiana Jones trilogy (1981–89). He subsequently explored drama in The Color Purple (1985) and Empire of the Sun (1987).\n\nIn 1993, Spielberg directed back-to-back blockbuster hits with the science fiction thriller Jurassic Park, the highest-grossing film ever at the time, and the Holocaust drama Schindler's List, which has often been listed as one of the greatest films ever made. He won the Academy Award for Best Director for the latter and the 1998 World War II epic Saving Private Ryan. Spielberg has since directed the science fiction films A.I. Artificial Intelligence (2001), Minority Report (2002), and War of the Worlds (2005); the adventure films The Adventures of Tintin (2011) and Ready Player One (2018); the historical dramas Amistad (1997), Munich (2005), War Horse (2011), Lincoln (2012), Bridge of Spies (2015) and The Post (2017); the musical West Side Story (2021); and the semi-autobiographical drama The Fabelmans (2022).",
    birth_date: '1946-12-18',
    death_date: '',
  },
  {
    id: 2,
    full_name: 'Ridley Scott',
    nationality: 'Great Britain',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/NASA_Journey_to_Mars_and_%E2%80%9CThe_Martian%E2%80%9D_%28201508180030HQ%29.jpg/220px-NASA_Journey_to_Mars_and_%E2%80%9CThe_Martian%E2%80%9D_%28201508180030HQ%29.jpg',
    biography:
      'Sir Ridley Scott GBE (born 30 November 1937) is an English filmmaker. He is best known for directing films in the science fiction, crime and historical drama genres. His work is known for its atmospheric and highly concentrated visual style. He ranks among the highest-grossing directors and has received many accolades, including the BAFTA Fellowship for lifetime achievement in 2018, two Primetime Emmy Awards, and a Golden Globe Award.He was knighted by Queen Elizabeth II in 2003, and appointed a Knight Grand Cross by King Charles III in 2024.\n\nAn alumnus of the Royal College of Art in London, Scott began his career in television as a designer and director before moving into advertising as a director of commercials. He made his film directorial debut with The Duellists (1977) and gained wider recognition with his next film, Alien (1979). Though his films range widely in setting and period, they showcase memorable imagery of urban environments, spanning 2nd-century Rome in Gladiator (2000), 12th-century Jerusalem in Kingdom of Heaven (2005), medieval England in Robin Hood (2010), ancient Memphis in Exodus: Gods and Kings (2014), contemporary Mogadishu in Black Hawk Down (2001), and the futuristic cityscapes of Blade Runner (1982) and different planets in Alien, Prometheus (2012), The Martian (2015) and Alien: Covenant (2017).',
    birth_date: '1937-11-30',
    death_date: '',
  },
  {
    id: 3,
    full_name: 'James Cameron',
    nationality: 'Canada',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/James_Cameron_by_Gage_Skidmore.jpg/240px-James_Cameron_by_Gage_Skidmore.jpg',
    biography:
      "James Francis Cameron (born August 16, 1954) is a Canadian filmmaker. He is a major figure in the post-New Hollywood era. He often uses novel technologies with a classical filmmaking style. He first gained recognition for writing and directing The Terminator (1984) and found further success with Aliens (1986), The Abyss (1989), Terminator 2: Judgment Day (1991), True Lies (1994), as well as Avatar (2009) and its sequels. He directed, wrote, co-produced, and co-edited Titanic (1997), winning three Academy Awards for Best Picture, Best Director, and Best Film Editing. He is a recipient of various other industry accolades, and three of his films have been selected for preservation in the National Film Registry by the Library of Congress.\n\nCameron co-founded the production companies Lightstorm Entertainment, Digital Domain, and Earthship Productions. In addition to filmmaking, he is a National Geographic explorer-in-residence and has produced many documentaries on deep-ocean exploration, including Ghosts of the Abyss (2003) and Aliens of the Deep (2005). Cameron has also contributed to underwater filming and remote vehicle technologies and helped create the digital 3D Fusion Camera System. In 2012, Cameron became the first person to do a solo descent to the bottom of the Mariana Trench, the deepest part of the Earth's ocean, in the Deepsea Challenger submersible.",
    birth_date: '1954-08-16',
    death_date: '',
  },
  {
    id: 4,
    full_name: 'James Mangold',
    nationality: 'United States of America',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/James_Mangold_Press_Conference_Logan_Berlinale_2017_03.jpg/440px-James_Mangold_Press_Conference_Logan_Berlinale_2017_03.jpg',
    biography:
      "James Allen Mangold (born December 16, 1963) is an American film director, producer and screenwriter. Noted for his versatility in tackling a range of genres, Mangold made his debut as a film director with Heavy (1995), and is best known for the films Cop Land (1997), Girl, Interrupted (1999), Identity (2003), Walk the Line (2005), 3:10 to Yuma (2007), and two films in the X-Men franchise with The Wolverine (2013) and Logan (2017), the latter of which earned him a nomination for the Academy Award for Best Adapted Screenplay. He then directed the sports drama film Ford v Ferrari (2019), which earned him a nomination for the Academy Award for Best Picture, and directed and co-wrote Indiana Jones and the Dial of Destiny (2023), the fifth and final installment in the Indiana Jones series.\n\nMangold was born in New York City in 1963, and is the son of Jewish artists Robert Mangold and Sylvia Plimack Mangold. He was raised in Hudson Valley and graduated from Washingtonville High School.\n\nHe attended the California Institute of the Arts film/video program where he studied under Alexander Mackendrick. During Mangold's third year, Mackendrick suggested that he should study at CalArts School of Theater as an actor, alongside his regular film studies.",
    birth_date: '1963-12-16',
    death_date: '',
  },
];

class DirectorController {
  getDirectors(req, res) {
    res.status(200).send(directors);
  }

  getDirectorById(req, res) {
    const {
      params: { directorId },
    } = req;
    const [director] = directors.filter(
      (director) => director.id === Number(directorId)
    );
    if (director) {
      res.status(200).send(director);
    } else {
      res.status(404).send('Director not found');
    }
  }

  createDirector(req, res) {
    const { body } = req;
    console.log(body);
    const newDirector = { ...body };
    directors.push(newDirector);
    res.status(201).send(newDirector);
  }

  updateDirector(req, res) {
    const {
      params: { directorId },
    } = req;
    const { body } = req;
    const newDirector = directors.map((director) => {
      if (director.id === Number(directorId)) {
        return { ...body };
      }
      return director;
    });
    console.log(newDirector);
    directors = newDirector;
    res.status(200).send(body);
  }

  deleteDirector(req, res) {
    const {
      params: { directorId },
    } = req;
    directors = directors.filter(
      (director) => director.id !== Number(directorId)
    );
    res.status(204).send('OK');
  }
}

module.exports = new DirectorController();
