const topics = [
  {
    slug: 'the-fungi-network',
    title: 'The hidden internet beneath a forest',
    category: 'Nature',
    readTime: 7,
    description: 'Underground fungal networks connect tree roots, move nutrients, and reshape how scientists think about forests.',
    tags: ['ecology', 'biology', 'forests'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Mycorrhizal_network'
  },
  {
    slug: 'octopus-intelligence',
    title: 'An intelligence with eight arms',
    category: 'Science',
    readTime: 6,
    description: 'Octopuses solve puzzles, use tools, and distribute much of their neural processing throughout their arms.',
    tags: ['biology', 'animals', 'neuroscience'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Octopus'
  },
  {
    slug: 'the-dancing-plague',
    title: 'The town that danced for days',
    category: 'History',
    readTime: 5,
    description: 'In 1518, a mysterious outbreak of compulsive dancing took over Strasbourg. Theories still compete to explain it.',
    tags: ['history', 'mysteries', 'culture'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Dancing_plague_of_1518'
  },
  {
    slug: 'your-brain-on-maps',
    title: 'Why your brain remembers places',
    category: 'Psychology',
    readTime: 6,
    description: 'Meet the place and grid cells that help the brain build an internal map of where you are.',
    tags: ['neuroscience', 'psychology', 'science'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Place_cell'
  },
  {
    slug: 'the-antikythera-mechanism',
    title: 'The ancient machine that predicted eclipses',
    category: 'History',
    readTime: 8,
    description: 'A corroded shipwreck find turned out to be a remarkably sophisticated astronomical calculator.',
    tags: ['history', 'engineering', 'space'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Antikythera_mechanism'
  },
  {
    slug: 'the-sounds-of-space',
    title: 'Can you hear a black hole?',
    category: 'Space',
    readTime: 5,
    description: 'Space is mostly silent, but astronomers can translate pressure waves and radio signals into sound.',
    tags: ['space', 'physics', 'music'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Sonification'
  },
  {
    slug: 'the-memory-palace',
    title: 'The memory trick used by champions',
    category: 'Psychology',
    readTime: 6,
    description: 'The method of loci turns familiar places into a surprisingly powerful system for remembering information.',
    tags: ['psychology', 'history', 'learning'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Method_of_loci'
  },
  {
    slug: 'how-paper-changed-the-world',
    title: 'A technology that travelled the Silk Road',
    category: 'History',
    readTime: 7,
    description: 'Paper began as a practical invention and went on to transform record-keeping, education, and government.',
    tags: ['history', 'technology', 'culture'],
    sourceUrl: 'https://en.wikipedia.org/wiki/History_of_paper'
  },
  {
    slug: 'the-deep-sea-snow',
    title: 'The ocean’s slow-motion snowfall',
    category: 'Nature',
    readTime: 5,
    description: 'Tiny fragments of life drift down through the ocean, feeding ecosystems far below the reach of sunlight.',
    tags: ['ocean', 'ecology', 'science'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Marine_snow'
  },
  {
    slug: 'the-invention-of-zero',
    title: 'How nothing became a number',
    category: 'Science',
    readTime: 7,
    description: 'Zero took centuries to become both a placeholder and a number—and it changed mathematics forever.',
    tags: ['mathematics', 'history', 'culture'],
    sourceUrl: 'https://en.wikipedia.org/wiki/0'
  },
  {
    slug: 'the-first-computer-programmer',
    title: 'The poet who imagined computer code',
    category: 'Technology',
    readTime: 6,
    description: 'Ada Lovelace saw that a machine could manipulate symbols, not just numbers, long before modern computers.',
    tags: ['technology', 'history', 'mathematics'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Ada_Lovelace'
  },
  {
    slug: 'why-we-get-goosebumps',
    title: 'Why music gives you goosebumps',
    category: 'Psychology',
    readTime: 4,
    description: 'A tiny leftover reflex from our evolutionary past may explain why a song can send a shiver down your spine.',
    tags: ['psychology', 'music', 'biology'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Frisson'
  },
  {
    slug: 'the-color-blue-in-art',
    title: 'The pigment that was once worth more than gold',
    category: 'Art & Culture',
    readTime: 6,
    description: 'For centuries, ultramarine blue travelled across continents and was reserved for the most important paintings.',
    tags: ['art', 'history', 'culture'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Ultramarine'
  },
  {
    slug: 'the-great-oxygenation',
    title: 'The time Earth nearly lost its atmosphere',
    category: 'Nature',
    readTime: 8,
    description: 'Ancient microbes filled the atmosphere with oxygen—an environmental catastrophe for some life, and an opening for other life.',
    tags: ['ecology', 'biology', 'geology'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Great_Oxidation_Event'
  },
  {
    slug: 'the-mystery-of-sleep',
    title: 'What happens in your brain while you sleep?',
    category: 'Science',
    readTime: 7,
    description: 'Sleep is not downtime: the brain cycles through stages that help with memory, repair, and emotional processing.',
    tags: ['neuroscience', 'biology', 'psychology'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Sleep'
  },
  {
    slug: 'the-first-webcam',
    title: 'The webcam invented to watch a coffee pot',
    category: 'Technology',
    readTime: 4,
    description: 'A group of researchers built an early webcam for one very relatable reason: to see if the coffee was ready.',
    tags: ['technology', 'internet', 'history'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Trojan_Room_coffee_pot'
  },
  {
    slug: 'animal-migration-maps',
    title: 'How birds navigate across a planet',
    category: 'Nature',
    readTime: 7,
    description: 'Migrating birds combine landmarks, stars, smell, and Earth’s magnetic field to find their way across continents.',
    tags: ['animals', 'biology', 'space'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Bird_migration'
  },
  {
    slug: 'the-mandela-effect',
    title: 'Why groups of people remember things wrong',
    category: 'Psychology',
    readTime: 5,
    description: 'Shared false memories reveal how reconstructive—and surprisingly social—human memory can be.',
    tags: ['psychology', 'memory', 'culture'],
    sourceUrl: 'https://en.wikipedia.org/wiki/False_memory'
  },
  {
    slug: 'the-library-of-ashurbanipal',
    title: 'The library buried beneath an ancient city',
    category: 'History',
    readTime: 6,
    description: 'Thousands of clay tablets survived the destruction of Nineveh and preserved stories, science, and daily life.',
    tags: ['history', 'literature', 'archaeology'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Library_of_Ashurbanipal'
  },
  {
    slug: 'how-coral-reefs-grow',
    title: 'Cities built by tiny animals',
    category: 'Nature',
    readTime: 6,
    description: 'Coral reefs are living structures built over generations by small animals in partnership with algae.',
    tags: ['ocean', 'ecology', 'animals'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Coral_reef'
  },
  {
    slug: 'the-turing-test',
    title: 'Can a machine convince you it is human?',
    category: 'Technology',
    readTime: 5,
    description: 'Alan Turing proposed a conversation-based test that still shapes debates about artificial intelligence.',
    tags: ['technology', 'artificial intelligence', 'philosophy'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Turing_test'
  },
  {
    slug: 'the-geometry-of-honeycombs',
    title: 'Why bees build with hexagons',
    category: 'Science',
    readTime: 5,
    description: 'The honeycomb’s tidy geometry balances efficient use of wax with strength and storage space.',
    tags: ['mathematics', 'animals', 'engineering'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Honeycomb'
  },
  {
    slug: 'the-origin-of-the-sandwich',
    title: 'A snack named after a night at the card table',
    category: 'Art & Culture',
    readTime: 4,
    description: 'The story behind the sandwich’s name sits at the intersection of food, folklore, and 18th-century society.',
    tags: ['culture', 'history', 'food'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Sandwich'
  },
  {
    slug: 'the-pale-blue-dot',
    title: 'Earth seen from the edge of the solar system',
    category: 'Space',
    readTime: 5,
    description: 'A distant photograph from Voyager 1 changed how millions of people pictured our place in the universe.',
    tags: ['space', 'astronomy', 'photography'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Pale_Blue_Dot'
  },
  {
    slug: 'the-worlds-oldest-stories',
    title: 'A flood story written thousands of years ago',
    category: 'Art & Culture',
    readTime: 7,
    description: 'The Epic of Gilgamesh is one of humanity’s oldest surviving works of literature, full of questions that still feel familiar.',
    tags: ['literature', 'history', 'culture'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Epic_of_Gilgamesh'
  },
  {
    slug: 'how-maps-lie',
    title: 'Why every flat map distorts the world',
    category: 'Science',
    readTime: 6,
    description: 'Turning a globe into a flat map always changes something—area, shape, distance, or direction.',
    tags: ['geography', 'mathematics', 'history'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Map_projection'
  },
  {
    slug: 'the-secret-life-of-urban-foxes',
    title: 'Wild foxes learning to live in cities',
    category: 'Nature',
    readTime: 5,
    description: 'Urban foxes adapt their routines, diets, and territories to the rhythms of human neighborhoods.',
    tags: ['animals', 'ecology', 'cities'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Urban_wildlife'
  },
  {
    slug: 'the-first-photograph',
    title: 'The photograph that took eight hours',
    category: 'Art & Culture',
    readTime: 4,
    description: 'Early photography needed long exposures, careful chemistry, and a view that would not move.',
    tags: ['art', 'history', 'photography'],
    sourceUrl: 'https://en.wikipedia.org/wiki/View_from_the_Window_at_Le_Gras'
  },
  {
    slug: 'how-the-internet-finds-a-route',
    title: 'How a message finds its way across the internet',
    category: 'Technology',
    readTime: 6,
    description: 'Data is split into packets that travel across a network of routers and are reassembled at their destination.',
    tags: ['technology', 'internet', 'engineering'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Internet_protocol_suite'
  },
  {
    slug: 'the-moon-illusion',
    title: 'Why the moon looks enormous near the horizon',
    category: 'Space',
    readTime: 4,
    description: 'The moon’s apparent size changes little, but your brain interprets it differently when it sits near the horizon.',
    tags: ['space', 'psychology', 'astronomy'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Moon_illusion'
  }
];

module.exports = {
  topics,
  categories: ['Art & Culture', 'History', 'Nature', 'Psychology', 'Science', 'Space', 'Technology']
};
