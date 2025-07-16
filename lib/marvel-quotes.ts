import type { MarvelQuote } from "./types"

export const marvelQuotes: MarvelQuote[] = [
  // Easy difficulty quotes
  {
    movie: "Iron Man",
    year: 2008,
    lines: [{ text: "I am Iron Man.", character: "Tony Stark" }],
    characters: ["Tony Stark"],
    difficulty: "easy",
  },
  {
    movie: "The Avengers",
    year: 2012,
    lines: [{ text: "That's my secret, Captain. I'm always angry.", character: "Bruce Banner" }],
    characters: ["Bruce Banner"],
    difficulty: "easy",
  },
  {
    movie: "Guardians of the Galaxy",
    year: 2014,
    lines: [{ text: "I am Groot.", character: "Groot" }],
    characters: ["Groot"],
    difficulty: "easy",
  },
  {
    movie: "Black Panther",
    year: 2018,
    lines: [{ text: "Wakanda forever!", character: "T'Challa" }],
    characters: ["T'Challa"],
    difficulty: "easy",
  },
  {
    movie: "Avengers: Infinity War",
    year: 2018,
    lines: [{ text: "I don't feel so good...", character: "Peter Parker" }],
    characters: ["Peter Parker"],
    difficulty: "easy",
  },
  {
    movie: "Avengers: Endgame",
    year: 2019,
    lines: [{ text: "I love you 3000.", character: "Morgan Stark" }],
    characters: ["Morgan Stark"],
    difficulty: "easy",
  },
  {
    movie: "Captain America: The First Avenger",
    year: 2011,
    lines: [{ text: "I can do this all day.", character: "Steve Rogers" }],
    characters: ["Steve Rogers"],
    difficulty: "easy",
  },
  {
    movie: "Thor",
    year: 2011,
    lines: [{ text: "This drink, I like it! ANOTHER!", character: "Thor" }],
    characters: ["Thor"],
    difficulty: "easy",
  },
  {
    movie: "The Avengers",
    year: 2012,
    lines: [{ text: "We have a Hulk.", character: "Tony Stark" }],
    characters: ["Tony Stark"],
    difficulty: "easy",
  },
  {
    movie: "Avengers: Endgame",
    year: 2019,
    lines: [{ text: "Avengers... Assemble.", character: "Steve Rogers" }],
    characters: ["Steve Rogers"],
    difficulty: "easy",
  },

  // Medium difficulty quotes
  {
    movie: "Iron Man",
    year: 2008,
    lines: [
      {
        text: "I shouldn't be alive... unless it was for a reason. I'm not crazy, Pepper. I just finally know what I have to do. And I know in my heart that it's right.",
        character: "Tony Stark",
      },
    ],
    characters: ["Tony Stark"],
    difficulty: "medium",
  },
  {
    movie: "Thor: Ragnarok",
    year: 2017,
    lines: [{ text: "I've been falling for thirty minutes!", character: "Loki" }],
    characters: ["Loki"],
    difficulty: "medium",
  },
  {
    movie: "Captain America: Civil War",
    year: 2016,
    lines: [{ text: "Just because something works doesn't mean it can't be improved.", character: "Shuri" }],
    characters: ["Shuri"],
    difficulty: "medium",
  },
  {
    movie: "Doctor Strange",
    year: 2016,
    lines: [{ text: "Dormammu, I've come to bargain.", character: "Doctor Strange" }],
    characters: ["Doctor Strange"],
    difficulty: "medium",
  },
  {
    movie: "Guardians of the Galaxy Vol. 2",
    year: 2017,
    lines: [{ text: "He may have been your father, boy, but he wasn't your daddy.", character: "Yondu" }],
    characters: ["Yondu"],
    difficulty: "medium",
  },
  {
    movie: "Spider-Man: Homecoming",
    year: 2017,
    lines: [{ text: "If you're nothing without the suit, then you shouldn't have it.", character: "Tony Stark" }],
    characters: ["Tony Stark"],
    difficulty: "medium",
  },
  {
    movie: "Captain Marvel",
    year: 2019,
    lines: [{ text: "I have nothing to prove to you.", character: "Carol Danvers" }],
    characters: ["Carol Danvers"],
    difficulty: "medium",
  },
  {
    movie: "Ant-Man",
    year: 2015,
    lines: [{ text: "Do you guys just put the word 'quantum' in front of everything?", character: "Scott Lang" }],
    characters: ["Scott Lang"],
    difficulty: "medium",
  },
  {
    movie: "Black Widow",
    year: 2021,
    lines: [
      {
        text: "I made a choice... to listen to my own instincts, and it's worked out pretty well so far.",
        character: "Natasha Romanoff",
      },
    ],
    characters: ["Natasha Romanoff"],
    difficulty: "medium",
  },
  {
    movie: "Shang-Chi and the Legend of the Ten Rings",
    year: 2021,
    lines: [{ text: "You're just a criminal who happened to have a change of heart.", character: "Shang-Chi" }],
    characters: ["Shang-Chi"],
    difficulty: "medium",
  },

  // Hard difficulty quotes
  {
    movie: "Thor: The Dark World",
    year: 2013,
    lines: [
      {
        text: "Some believe that before the universe, there was nothing. They're wrong. There was darkness... and it has survived.",
        character: "Malekith",
      },
    ],
    characters: ["Malekith"],
    difficulty: "hard",
  },
  {
    movie: "Guardians of the Galaxy",
    year: 2014,
    lines: [{ text: "Nothing goes over my head. My reflexes are too fast. I would catch it.", character: "Drax" }],
    characters: ["Drax"],
    difficulty: "hard",
  },
  {
    movie: "Avengers: Age of Ultron",
    year: 2015,
    lines: [
      {
        text: "Everyone creates the thing they dread. Men of peace create engines of war, invaders create avengers, people create... smaller people? Uh... children! I lost the word there.",
        character: "Ultron",
      },
    ],
    characters: ["Ultron"],
    difficulty: "hard",
  },
  {
    movie: "Ant-Man and the Wasp",
    year: 2018,
    lines: [{ text: "Do you really just put 'quantum' in front of everything?", character: "Hope van Dyne" }],
    characters: ["Hope van Dyne"],
    difficulty: "hard",
  },
  {
    movie: "Captain America: The Winter Soldier",
    year: 2014,
    lines: [
      {
        text: "The price of freedom is high. It always has been. And it's a price I'm willing to pay.",
        character: "Steve Rogers",
      },
    ],
    characters: ["Steve Rogers"],
    difficulty: "hard",
  },
  {
    movie: "Spider-Man: Far From Home",
    year: 2019,
    lines: [{ text: "Uneasy lies the head that wears the crown.", character: "Quentin Beck" }],
    characters: ["Quentin Beck"],
    difficulty: "hard",
  },
  {
    movie: "Eternals",
    year: 2021,
    lines: [
      {
        text: "When you love something, you protect it. It's the most natural thing in the world.",
        character: "Thena",
      },
    ],
    characters: ["Thena"],
    difficulty: "hard",
  },
  {
    movie: "Doctor Strange in the Multiverse of Madness",
    year: 2022,
    lines: [
      {
        text: "Just because someone stumbles and loses their way doesn't mean they are lost forever.",
        character: "Charles Xavier",
      },
    ],
    characters: ["Charles Xavier"],
    difficulty: "hard",
  },
  {
    movie: "Thor: Love and Thunder",
    year: 2022,
    lines: [{ text: "The only ones who gods care about is themselves.", character: "Gorr" }],
    characters: ["Gorr"],
    difficulty: "hard",
  },
  {
    movie: "Black Panther: Wakanda Forever",
    year: 2022,
    lines: [{ text: "Only the most broken people can be great leaders.", character: "Namor" }],
    characters: ["Namor"],
    difficulty: "hard",
  },

  // Multi-speaker quotes - Easy
  {
    movie: "The Avengers",
    year: 2012,
    lines: [
      { text: "That's the secret, Cap. It's always angry.", character: "Bruce Banner" },
      { text: "Dr. Banner, now might be a good time for you to get angry.", character: "Steve Rogers" },
    ],
    characters: ["Bruce Banner", "Steve Rogers"],
    difficulty: "easy",
  },
  {
    movie: "Avengers: Infinity War",
    year: 2018,
    lines: [
      { text: "I am Groot.", character: "Groot" },
      { text: "I am Steve Rogers.", character: "Steve Rogers" },
    ],
    characters: ["Groot", "Steve Rogers"],
    difficulty: "easy",
  },
  {
    movie: "Iron Man",
    year: 2008,
    lines: [
      { text: "Let's face it, this is not the worst thing you've caught me doing.", character: "Tony Stark" },
      { text: "Are those bullet holes?", character: "Pepper Potts" },
    ],
    characters: ["Tony Stark", "Pepper Potts"],
    difficulty: "easy",
  },

  // Multi-speaker quotes - Medium
  {
    movie: "Guardians of the Galaxy",
    year: 2014,
    lines: [
      { text: "I am Groot.", character: "Groot" },
      { text: "So what? It's better than 11% of a plan.", character: "Star-Lord" },
      { text: "That's barely a concept.", character: "Gamora" },
    ],
    characters: ["Groot", "Star-Lord", "Gamora"],
    difficulty: "medium",
  },
  {
    movie: "Spider-Man: Homecoming",
    year: 2017,
    lines: [
      { text: "What the hell? He just stole a guy's pizza!", character: "Ned Leeds" },
      { text: "I'm gonna get it back for him.", character: "Peter Parker" },
    ],
    characters: ["Ned Leeds", "Peter Parker"],
    difficulty: "medium",
  },
  {
    movie: "Thor: Ragnarok",
    year: 2017,
    lines: [
      { text: "We know each other! He's a friend from work!", character: "Thor" },
      { text: "I don't even know who you are.", character: "Hulk" },
    ],
    characters: ["Thor", "Hulk"],
    difficulty: "medium",
  },

  // Multi-speaker quotes - Hard
  {
    movie: "Captain America: Civil War",
    year: 2016,
    lines: [
      {
        text: "I'm saying there may be a causality. Our very strength invites challenge, challenge incites conflict, and conflict... breeds catastrophe.",
        character: "Vision",
      },
      { text: "You're saying it's our fault?", character: "James Rhodes" },
    ],
    characters: ["Vision", "James Rhodes"],
    difficulty: "hard",
  },
  {
    movie: "Avengers: Endgame",
    year: 2019,
    lines: [
      { text: "You could not live with your own failure. Where did that bring you? Back to me.", character: "Thanos" },
      {
        text: "I thought by eliminating half of life, the other half would thrive. But you've shown me, that's impossible.",
        character: "Thanos",
      },
      {
        text: "As long as there are those that remember what was, there will always be those that are unable to accept what can be.",
        character: "Thanos",
      },
    ],
    characters: ["Thanos"],
    difficulty: "hard",
  },
  {
    movie: "Doctor Strange",
    year: 2016,
    lines: [
      {
        text: "You're a man looking at the world through a keyhole. You've spent your whole life trying to widen that keyhole. To see more, to know more. And now, on hearing that it can be widened in ways you can't imagine, you reject the possibility.",
        character: "The Ancient One",
      },
      {
        text: "No, I reject it because I do not believe in fairy tales about chakras or energy or the power of belief.",
        character: "Doctor Strange",
      },
    ],
    characters: ["The Ancient One", "Doctor Strange"],
    difficulty: "hard",
  },
]
