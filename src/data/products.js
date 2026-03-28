// Bakehouse by the Crumb - Product Data

export const products = [
  {
    id: 'lotus-biscoff-cheesecake',
    name: 'Lotus Biscoff Cheesecake',
    tagline: 'Customer Favorite',
    price: 120,
    category: 'cheesecake',
    description: 'Creamy cheesecake topped with caramelized Lotus Biscoff cookies. A perfect blend of sweetness and crunch.',
    image: 'https://images.unsplash.com/photo-1567327613485-fbc7bf196198?w=800&q=80',
    badges: ['100% Veg', 'Premium'],
    popular: true,
  },
  {
    id: 'basque-cheesecake',
    name: 'Basque Cheesecake',
    tagline: 'Spanish Classic',
    price: 150,
    category: 'cheesecake',
    description: 'Authentic burnt Basque-style cheesecake with a caramelized top and creamy, custard-like center.',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80',
    badges: ['100% Veg', 'Artisan'],
    popular: true,
  },
  {
    id: 'chocolate-brownie',
    name: 'Chocolate Brownie',
    tagline: 'Rich & Fudgy',
    price: 60,
    category: 'brownie',
    description: 'Decadent chocolate brownie with a crackly top and gooey, fudgy center. Made with premium cocoa.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?w=800&q=80',
    badges: ['100% Veg', 'Chocolate Lover'],
    popular: true,
  },
  {
    id: 'choco-lava',
    name: 'Choco Lava',
    tagline: 'Molten Center',
    price: 70,
    category: 'lava',
    description: 'Warm chocolate cake with a molten lava center that flows when you cut into it. Pure indulgence.',
    image: 'https://images.unsplash.com/photo-1617305855058-29070f783bb9?w=800&q=80',
    badges: ['100% Veg', 'Warm'],
    popular: true,
  },
];

export const categories = [
  { id: 'all', name: 'All Products', icon: '🧁' },
  { id: 'cheesecake', name: 'Cheesecakes', icon: '🍰' },
  { id: 'brownie', name: 'Brownies', icon: '🍫' },
  { id: 'lava', name: 'Lava Cakes', icon: '🌋' },
];

export const brandFeatures = [
  { icon: '🏠', title: '100% Homemade', description: 'Made with love in our kitchen' },
  { icon: '⭐', title: 'Premium Ingredients', description: 'Only the finest quality ingredients' },
  { icon: '🌿', title: '100% Veg Products', description: 'Pure vegetarian, no eggs option available' },
  { icon: '👩‍🍳', title: 'Freshly Baked', description: 'Baked fresh for every order' },
];

export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    text: 'The Lotus Biscoff Cheesecake is absolutely divine! Best I\'ve had in Jhansi. Rashmi di\'s baking is pure magic.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Amit Verma',
    text: 'Ordered a custom cake for my daughter\'s birthday. Not only did it look stunning, but it tasted incredible too!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Neha Gupta',
    text: 'The Choco Lava is to die for! That molten center is perfection. Highly recommend Bakehouse by the Crumb.',
    rating: 5,
  },
];
