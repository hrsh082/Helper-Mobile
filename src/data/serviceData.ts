import { Service } from '../types';

export const serviceData: Record<string, Service> = {
  'electrician': {
    id: 'electrician',
    title: 'Electrician Services',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop',
    description: 'Professional electrical services for your home and office',
    startingPrice: '₹299',
    features: [
      'Switch & Socket Installation',
      'Fan & Light Fitting',
      'MCB & Wiring Repairs',
      'Appliance Installation',
      'Electrical Safety Checks',
      'Emergency Repairs'
    ],
    providers: [
      { id: 1, name: 'Rajesh Kumar', rating: 4.8, experience: '8 years', price: '₹299', available: true, lat: 23.0225, lon: 72.5714 },
      { id: 2, name: 'Amit Patel', rating: 4.9, experience: '10 years', price: '₹349', available: true, lat: 23.0300, lon: 72.5800 },
      { id: 3, name: 'Suresh Sharma', rating: 4.7, experience: '6 years', price: '₹279', available: false, lat: 23.0150, lon: 72.5600 }
    ]
  },
  'plumber': {
    id: 'plumber',
    title: 'Plumbing Services',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=600&auto=format&fit=crop',
    description: 'Expert plumbing solutions for leaks, fittings, and drainage',
    startingPrice: '₹249',
    features: [
      'Tap & Pipe Repair',
      'Water Tank Cleaning',
      'Drainage Unclogging',
      'Sanitaryware Installation',
      'Leak Detection & Repair',
      'Bathroom Fitting'
    ],
    providers: [
      { id: 1, name: 'Vikram Singh', rating: 4.9, experience: '12 years', price: '₹249', available: true, lat: 23.0250, lon: 72.5750 },
      { id: 2, name: 'Dinesh Verma', rating: 4.6, experience: '5 years', price: '₹229', available: true, lat: 23.0350, lon: 72.5900 }
    ]
  },
  'carpenter': {
    id: 'carpenter',
    title: 'Carpentry Services',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=600&auto=format&fit=crop',
    description: 'Custom furniture, repairs, and wooden fitting work',
    startingPrice: '₹349',
    features: [
      'Furniture Repair & Assembly',
      'Door & Window Fitting',
      'Custom Cabinetry',
      'Lock & Handle Repair',
      'Polishing & Touchup',
      'Wooden Flooring Repair'
    ],
    providers: [
      { id: 1, name: 'Ramesh Mistri', rating: 4.8, experience: '15 years', price: '₹349', available: true, lat: 23.0200, lon: 72.5650 }
    ]
  },
  'ac-repair': {
    id: 'ac-repair',
    title: 'AC Service & Repair',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop',
    description: 'AC servicing, gas refilling, installation, and deep cleaning',
    startingPrice: '₹499',
    features: [
      'Foam Jet Service',
      'Gas Top-up & Refill',
      'AC Installation / Uninstallation',
      'PCB & Component Repair',
      'Water Leakage Repair',
      'Annual Maintenance Contract'
    ],
    providers: [
      { id: 1, name: 'Manoj Aircon', rating: 4.9, experience: '9 years', price: '₹499', available: true, lat: 23.0280, lon: 72.5720 }
    ]
  },
  'cleaning': {
    id: 'cleaning',
    title: 'Home Deep Cleaning',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop',
    description: 'Complete home, kitchen, and bathroom sanitization & deep cleaning',
    startingPrice: '₹799',
    features: [
      'Full Home Deep Clean',
      'Kitchen Degreasing & Sanitization',
      'Bathroom Scrubbing & Disinfection',
      'Sofa & Carpet Shampooing',
      'Balcony & Window Cleaning',
      'Post-Renovation Cleaning'
    ],
    providers: [
      { id: 1, name: 'CleanHome Experts', rating: 4.9, experience: '7 years', price: '₹799', available: true, lat: 23.0210, lon: 72.5690 }
    ]
  }
};
