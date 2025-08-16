export type Plant = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  careLevel: 'Easy' | 'Moderate' | 'Difficult';
  lighting: 'Low' | 'Medium' | 'Bright';
};

export const plants: Plant[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    price: 35.00,
    image: 'https://placehold.co/600x600.png',
    description: 'Known for its iconic split leaves, the Monstera Deliciosa adds a touch of the tropics to any room. It\'s a relatively easy-to-care-for statement plant.',
    careLevel: 'Easy',
    lighting: 'Bright',
  },
  {
    id: '2',
    name: 'Snake Plant',
    price: 25.00,
    image: 'https://placehold.co/600x600.png',
    description: 'With its stiff, upright leaves, the Snake Plant is a hardy, architectural plant that thrives on neglect and purifies the air. Perfect for beginners.',
    careLevel: 'Easy',
    lighting: 'Low',
  },
  {
    id: '3',
    name: 'Fiddle Leaf Fig',
    price: 55.00,
    image: 'https://placehold.co/600x600.png',
    description: 'A design world favorite, the Fiddle Leaf Fig boasts large, violin-shaped leaves. It can be finicky but rewards consistent care with stunning growth.',
    careLevel: 'Difficult',
    lighting: 'Bright',
  },
  {
    id: '4',
    name: 'ZZ Plant',
    price: 28.00,
    image: 'https://placehold.co/600x600.png',
    description: 'The Zamioculcas zamiifolia, or ZZ Plant, is a drought-tolerant gem with glossy, dark green leaves. It can handle low light and infrequent watering.',
    careLevel: 'Easy',
    lighting: 'Low',
  },
  {
    id: '5',
    name: 'Pothos',
    price: 18.00,
    image: 'https://placehold.co/600x600.png',
    description: 'This vining plant is incredibly resilient and comes in various beautiful variegations. It\'s great for hanging baskets or trailing down shelves.',
    careLevel: 'Easy',
    lighting: 'Medium',
  },
  {
    id: '6',
    name: 'Calathea Orbifolia',
    price: 40.00,
    image: 'https://placehold.co/600x600.png',
    description: 'Famous for its large, round leaves with beautiful silver stripes, the Calathea Orbifolia is a showstopper that loves humidity and consistent moisture.',
    careLevel: 'Moderate',
    lighting: 'Medium',
  },
  {
    id: '7',
    name: 'Bird of Paradise',
    price: 65.00,
    image: 'https://placehold.co/600x600.png',
    description: 'Bring a dramatic, tropical flair indoors with the Bird of Paradise. Its large, banana-like leaves create an instant jungle vibe.',
    careLevel: 'Moderate',
    lighting: 'Bright',
  },
  {
    id: '8',
    name: 'Spider Plant',
    price: 22.00,
    image: 'https://placehold.co/600x600.png',
    description: 'A classic and charismatic houseplant, the Spider Plant features arching leaves and sends out "spiderettes" or baby plants, making it easy to propagate.',
    careLevel: 'Easy',
    lighting: 'Bright',
  }
];
