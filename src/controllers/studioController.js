let studios = [
  {
    id: 1,
    title: 'Lucasfilm Ltd.',
    location: 'San Francisco',
    foundation_year: '1971',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Lucasfilm_logo.svg/250px-Lucasfilm_logo.svg.png',
    about:
      "Lucasfilm Ltd. LLC is an American film and television production company founded by filmmaker George Lucas in 1971 in San Rafael, California, though most of the company's operations were moved to San Francisco in 2005. It has been a subsidiary of The Walt Disney Studios since 2012 and is best known for creating and producing the Star Wars and Indiana Jones franchises, as well as its leadership in developing special effects, sound, and computer animation for films.\n\nThe company's films Star Wars: Episode I – The Phantom Menace (1999), Star Wars: The Force Awakens (2015), Rogue One: A Star Wars Story (2016), Star Wars: The Last Jedi (2017), and Star Wars: The Rise of Skywalker (2019) are all among the 50 highest-grossing films of all time, with The Force Awakens becoming the highest-grossing film in the United States and Canada. On October 30, 2012, Disney acquired Lucasfilm for $4.05 billion in the form of cash and $1.855 billion in stock.",
  },

  {
    id: 2,
    title: '20th Century Studios, Inc.',
    location: 'Los Angeles',
    foundation_year: '1935',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlWG8HxHW6-VKfUD-QiVpnFeHfh4u_qYguFA&s',
    about:
      "20th Century Studios, Inc. is an American film studio owned by the Walt Disney Studios, a division of Disney Entertainment, in turn a division of The Walt Disney Company. It is headquartered at the Fox Studio Lot in the Century City area of Los Angeles, leased from Fox Corporation. Walt Disney Studios Motion Pictures distributes and markets the films produced by 20th Century Studios in theatrical markets.\n\nFor over 80 years, 20th Century was one of the major American film studios. It was formed in 1935 as Twentieth Century-Fox Film Corporation by the merger of Fox Film and Twentieth Century Pictures, and one of the original \"Big Five\" among eight majors of Hollywood's Golden Age. In 1985, the studio removed the hyphen in the name (becoming Twentieth Century Fox Film Corporation) after being acquired by Rupert Murdoch's News Corporation, which was renamed 21st Century Fox in 2013 after it spun off its publishing assets. Disney purchased most of 21st Century Fox's assets, which included 20th Century Fox, on March 20, 2019. The studio adopted its current name as a trade name on January 17, 2020, in order to avoid confusion with Fox Corporation, and subsequently started to use it for the copyright of 20th Century and Searchlight Pictures productions on December 4.",
  },

  {
    id: 3,
    title: 'Walt Disney Pictures',
    location: 'California',
    foundation_year: 1929,
    logo: 'https://i.insider.com/5f5770dee6ff30001d4e7684?width=800&format=jpeg&auto=webp',
    about:
      "Walt Disney Pictures (credited as Disney in theatrical releases) is an American film production company and subsidiary of Walt Disney Studios, a division of Disney Entertainment, which is owned by The Walt Disney Company. The studio is the flagship producer of live-action feature films within the Walt Disney Studios unit, and is based at the Walt Disney Studios in Burbank, California. Animated films produced by Walt Disney Animation Studios and Pixar Animation Studios are also released under the studio banner. Walt Disney Studios Motion Pictures distributes and markets the films produced by Walt Disney Pictures.\n\nDisney began producing live-action films in the 1950s. The live-action division became Walt Disney Pictures in 1983, when Disney reorganized its entire studio division; which included the separation from the feature animation division and the subsequent creation of Touchstone Pictures. At the end of that decade, combined with Touchstone's output, Walt Disney Pictures elevated Disney to one of Hollywood's major film studios.\n\nWalt Disney Pictures is currently one of five live-action film studios within the Walt Disney Studios, alongside 20th Century Studios, Marvel Studios, Lucasfilm, and Searchlight Pictures. The 2019 remake of The Lion King is the studio's highest-grossing film worldwide with $1.6 billion, and Pirates of the Caribbean is the studio's most successful film series, with five films earning a total of over $4.5 billion in worldwide box office gross.",
  },

  {
    id: 4,
    title: 'New Line Cinema',
    location: 'Los Angeles',
    foundation_year: 1967,
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC-5SpIGPcNSnOT5_jDBdLa9zAE3yESllFFw&s',
    about:
      "New Line Productions, Inc., doing business as New Line Cinema, is an American film and television production studio owned by Warner Bros. Discovery (WBD). Since 2008, it has been operating as a unit of Warner Bros. Pictures.\n\nNew Line Cinema was established in 1967 by the then 27-year-old Robert Shaye as a film distribution company, supplying foreign and art films for college campuses in the United States. Shaye operated New Line's offices out of his apartment at 14th Street and Second Avenue in New York City. One of the company's early successes was its distribution of the 1936 anti-cannabis propaganda film Reefer Madness, which became a cult hit on American college campuses in the early 1970s. New Line also released many classic foreign-language films, like Stay As You Are, Immoral Tales and Get Out Your Handkerchiefs (which became the first New Line film to win an Oscar). The studio has also released many of the films of John Waters.\n\nIn 1976, New Line secured funding to produce its first full-length feature, Stunts (1977), directed by Mark L. Lester. Although not considered a critical success, the film performed well commercially on the international market and on television.\n\nIn 1980, Shaye's law school classmate Michael Lynne became outside counsel and adviser to the company and renegotiated its debt.\n\nIn 1983, Bryanston Distributing Company, the company that first distributed the original The Texas Chain Saw Massacre, lost the rights to that film, and the rights reverted to the original owners. New Line bought the rights and re-released the film to theatres that same year. It became very successful for the studio.\n\nNew Line expanded its film production in the early 1980s, producing or co-producing films including Polyester, directed by John Waters, and Alone in the Dark. Polyester was one of the first films to introduce a novelty cinema experience named Odorama, where members of the audience were provided with a set of \"scratch and sniff\" cards to be scratched and sniffed at specific times during the film, which provided an additional sensory connection to the viewed image. In 1983, Lynne joined the board. In 1984, Dawn Altyn and Jeff Youngs joined New Line, respectively as sales manager, eastern and southern divisions of New Line Distribution, and national print controller of the studio, to distribute new projects.",
  },
];

class StudioController {
  getStudios(req, res) {
    res.status(200).send(studios);
  }

  getStudioById(req, res) {
    const {
      params: { studioId },
    } = req;
    const [studio] = studios.filter((studio) => studio.id === Number(studioId));
    if (studio) {
      res.status(200).send(studio);
    } else {
      res.status(404).send('Studio not found');
    }
  }

  createStudio(req, res) {
    const { body } = req;
    console.log(body);
    const newStudio = { ...body };
    studios.push(newStudio);
    res.status(201).send(newStudio);
  }

  updateStudio(req, res) {
    const {
      params: { studioId },
    } = req;
    const { body } = req;
    const newStudio = studios.map((studio) => {
      if (studio.id === Number(studioId)) {
        return { ...body };
      }
      return studio;
    });
    console.log(newStudio);
    studios = newStudio;
    res.status(200).send(body);
  }

  deleteStudio(req, res) {
    const {
      params: { studioId },
    } = req;
    studios = studios.filter((studio) => studio.id !== Number(studioId));
    res.status(204).send('OK');
  }
}

module.exports = new StudioController();
