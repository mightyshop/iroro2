import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    title: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    rating: 4.8,
    reviews: 245,
    category: 'audio',
    type: 'physical',
    features: [
      'Active Noise Cancellation',
      '40-hour battery life',
      'Premium sound quality',
      'Comfortable fit',
      'Voice assistant support'
    ],
    weight: '250g',
    dimensions: '18 x 15 x 8 cm',
    shippingTime: '3-5 business days',
    stock: 50,
    seller: {
      id: 's1',
      name: 'AudioTech Pro',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.9
    }
  },
  {
    id: 2,
    title: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Track your fitness goals with this advanced smartwatch.',
    rating: 4.6,
    reviews: 189,
    category: 'wearables',
    type: 'physical',
    features: [
      'Heart rate monitoring',
      'GPS tracking',
      'Water resistant',
      'Sleep tracking',
      'Multiple sport modes'
    ],
    weight: '45g',
    dimensions: '4.2 x 3.6 x 1.2 cm',
    shippingTime: '2-4 business days',
    stock: 75,
    seller: {
      id: 's2',
      name: 'FitGear',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.7
    }
  },
  {
    id: 3,
    title: 'Productivity App Bundle',
    price: 49.99,
    image: 'https://images.pexels.com/photos/5499254/pexels-photo-5499254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Suite of productivity apps to boost your workflow.',
    rating: 4.5,
    reviews: 312,
    category: 'software',
    type: 'digital',
    features: [
      'Task management',
      'Calendar integration',
      'Cloud sync',
      'Cross-platform',
      'Lifetime updates'
    ],
    downloadUrl: 'https://example.com/download',
    fileSize: '250MB',
    fileFormat: 'ZIP',
    seller: {
      id: 's3',
      name: 'PowerPlus',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.6
    }
  },
  {
    id: 4,
    title: 'Game Development Course',
    price: 79.99,
    image: 'https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Complete course on game development with Unity.',
    rating: 4.7,
    reviews: 156,
    category: 'education',
    type: 'digital',
    features: [
      '50+ hours of content',
      'Project files included',
      'Certificate on completion',
      'Lifetime access',
      'Community support'
    ],
    downloadUrl: 'https://example.com/course',
    fileSize: '15GB',
    fileFormat: 'MP4, PDF',
    seller: {
      id: 's4',
      name: 'GamersChoice',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.8
    }
  },
  {
    id: 5,
    title: 'Mechanical Keyboard',
    price: 129.99,
    image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'RGB mechanical keyboard with custom switches.',
    rating: 4.9,
    reviews: 203,
    category: 'gaming',
    type: 'physical',
    features: [
      'Mechanical switches',
      'RGB backlighting',
      'N-key rollover',
      'Durable construction',
      'Customizable macros'
    ],
    weight: '1.2kg',
    dimensions: '44 x 14 x 4 cm',
    shippingTime: '4-6 business days',
    stock: 30,
    seller: {
      id: 's4',
      name: 'GamersChoice',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.8
    }
  },
  {
    id: 6,
    title: 'Stock Photo Collection',
    price: 159.99,
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Premium collection of 1000+ high-resolution stock photos.',
    rating: 4.7,
    reviews: 278,
    category: 'media',
    type: 'digital',
    features: [
      '1000+ photos',
      '4K resolution',
      'Commercial license',
      'Regular updates',
      'Various categories'
    ],
    downloadUrl: 'https://example.com/photos',
    fileSize: '25GB',
    fileFormat: 'JPG, RAW',
    seller: {
      id: 's1',
      name: 'AudioTech Pro',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.9
    }
  }
];