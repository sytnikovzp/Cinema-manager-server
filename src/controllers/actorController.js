let actors = [
  {
    id: 1,
    full_name: 'Karen Allen',
    nationality: 'United States of America',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/b/ba/Karenallen17_cropped.jpg',
    biography:
      'Allen was born on October 5, 1951, in Carrollton, Illinois, to Ruth Patricia (née Howell) (1927–2020), a university professor, and Carroll Thompson Allen (1925–2015), an FBI agent. She is of English, Irish, Scottish, and Welsh descent. Her father\'s job forced the family to move often. "I grew up moving almost every year and so I was always the new kid in school and always, in a way, was deprived of ever really having any lasting friendships", Allen said in 1987. Although Allen says her father was very much involved in the family, she felt that she and her two sisters grew up in a very female-dominated household.\n\nAfter she graduated from DuVal High School, in Lanham, Maryland, at 17, she moved to New York City to study art and design at Fashion Institute of Technology for two years. Allen later ran a boutique on the University of Maryland campus and spent time traveling through South and Central Asia. She attended George Washington University and began to study and perform with the experimental company, the Washington Theatre Laboratory, in Washington, D.C. In 1974, Allen joined Shakespeare & Company in Massachusetts. Three years later, she moved back to New York City and studied at the Lee Strasberg Theater Institute.\n\nHer critical and commercial breakthrough came when she portrayed Marion Ravenwood opposite Harrison Ford in Raiders of the Lost Ark (1981), for which she won the Saturn Award for Best Actress. She later co-starred in Shoot the Moon (1982), Starman (1984), for which she was again nominated for the Saturn Award for Best Actress, and Scrooged (1988). She has also received recognition for her work in The Glass Menagerie (1987), Year by the Sea (2016), and Colewell (2019). She reprised her role as Marion Ravenwood in Indiana Jones and the Kingdom of the Crystal Skull (2008) and Indiana Jones and the Dial of Destiny (2023).',
    birth_date: '1951-10-05',
    death_date: '',
  },

  {
    id: 2,
    full_name: 'Tom Skerritt',
    nationality: 'United States of America',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Tom_Skerritt_2014_%28cropped%29.jpg/440px-Tom_Skerritt_2014_%28cropped%29.jpg',
    biography:
      "Thomas Roy Skerritt (born August 25, 1933) is an American actor who has appeared in over 40 films and more than 200 television episodes since 1962. He is known for his film roles in M*A*S*H, Alien, The Dead Zone, Top Gun, A River Runs Through It, Poltergeist III, and Up in Smoke, and the television series Picket Fences and Cheers. Skerritt has earned several nominations and awards, including winning the Primetime Emmy Award for Outstanding Lead Actor in a Drama Series in 1993 for Picket Fences.\n\nSkerritt was born in Detroit, Michigan, the son of Helen, a homemaker, and Roy Skerritt, a businessman. He is the youngest of three children. A 1951 graduate of Detroit's Mackenzie High School, Skerritt attended Wayne State University and the University of California, Los Angeles.\n\nSkerritt enlisted just after graduating from high school, and served a four-year tour of duty in the United States Air Force as a classifications specialist. Most of his enlistment was spent at Bergstrom Field, Austin, Texas.",
    birth_date: '1933-08-25',
    death_date: '',
  },

  {
    id: 3,
    full_name: 'Veronica Cartwright',
    nationality: 'Great Britain',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Veronica_Cartwright_2022.jpg/440px-Veronica_Cartwright_2022.jpg',
    biography:
      "Veronica Cartwright (born April 20, 1949) is a British-born American actress. She is known for appearing in science fiction and horror films, and has earned numerous accolades, including three Primetime Emmy Award nominations. Her younger sister is actress Angela Cartwright.\n\nAs a child actress, Cartwright appeared in supporting roles in The Children's Hour and The Birds, the latter of which was her first commercial success. She made her transition into mainstream, mature roles with 1978's Invasion of the Body Snatchers. She played Lambert in the science-fiction horror film Alien, which earned her recognition and a Saturn Award for Best Supporting Actress, and additionally appeared in the films The Right Stuff and The Witches of Eastwick which earned her praise. In the 1990s, she received three nominations for the Primetime Emmy Award for Outstanding Guest Actress in a Drama Series, one of which was for her role on ER and two of which were for her role in The X-Files.\n\nCartwright was born in Bristol, England, and grew up in Los Angeles, having emigrated to the US shortly after the birth of her younger sister, actress Angela Cartwright.",
    birth_date: '1949-04-20',
    death_date: '',
  },

  {
    id: 4,
    full_name: 'John Hurt',
    nationality: 'Great Britain',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/John_Hurt_at_the_2009_Tribeca_Film_Festival.jpg/440px-John_Hurt_at_the_2009_Tribeca_Film_Festival.jpg',
    biography:
      "John Vincent Hurt was born on January 22, 1940, in Chesterfield, Derbyshire, the son of Phyllis (née Massey; 1907–1975), an engineer and one-time actress, and Arnold Herbert Hurt (1904–1999), a mathematician who became a Church of England clergyman and served as vicar of Holy Trinity Church in Shirebrook, Derbyshire. His father was previously vicar of St John's parish in Sunderland, County Durham. In 1937, he moved his family to Derbyshire, where he became Perpetual Curate of Holy Trinity Church. When Hurt was five, his father became the vicar of St Stephen's Church in Woodville, Derbyshire, and remained there until 1953.\n\nAt the age of eight, Hurt was sent to the Anglican St Michael's Preparatory School in Otford, Kent, where he eventually developed his passion for acting. He decided he wanted to become an actor after his first role as a girl in a school production of The Blue Bird by Maurice Maeterlinck. Hurt stated that a senior master at the school would abuse him and others by removing his two false front teeth and putting his tongue in the boys' mouths, as well as rubbing their faces with his stubble, and that the experience affected him hugely. Hurt, aged 12, became a boarder at Lincoln School (then a grammar school) because he had failed the entrance examination for admission to his brother's school. His headmaster at Lincoln School laughed when Hurt told him he wanted to be an actor, telling him, \"Well, you may be all right in school plays but you wouldn't stand a chance in the profession.\"\n\nHurt reprised his role as Quentin Crisp in An Englishman in New York (2009), which brought his seventh BAFTA nomination. He portrayed an incarnation of the Doctor known as the War Doctor in Doctor Who. He voiced roles in Watership Down (1978), The Lord of the Rings (1978), The Plague Dogs (1982), The Black Cauldron (1985), Dogville (2003), Valiant (2005) and BBC's Merlin (2008–2012), as well as The Gruffalo's Child (2011), and Thomas & Friends: Sodor's Legend of the Lost Treasure (2015).",
    birth_date: '1940-01-22',
    death_date: '2017-01-25',
  },
];

class ActorController {
  getActors(req, res) {
    res.status(200).send(actors);
  }

  getActorById(req, res) {
    const {
      params: { actorId },
    } = req;
    const [actor] = actors.filter((actor) => actor.id === Number(actorId));
    if (actor) {
      res.status(200).send(actor);
    } else {
      res.status(404).send('Actor not found');
    }
  }

  createActor(req, res) {
    const { body } = req;
    console.log(body);
    const newActor = { ...body };
    actors.push(newActor);
    res.status(201).send(newActor);
  }

  updateActor(req, res) {
    const {
      params: { actorId },
    } = req;
    const { body } = req;
    const newActor = actors.map((actor) => {
      if (actor.id === Number(actorId)) {
        return { ...body };
      }
      return actor;
    });
    console.log(newActor);
    actors = newActor;
    res.status(200).send(body);
  }

  deleteActor(req, res) {
    const {
      params: { actorId },
    } = req;
    actors = actors.filter((actor) => actor.id !== Number(actorId));
    res.status(204).send('OK');
  }
}

module.exports = new ActorController();
