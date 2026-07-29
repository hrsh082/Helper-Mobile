export interface Provider {
  id: number;
  name: string;
  rating: number;
  experience: string;
  price: string;
  available: boolean;
  lat: number;
  lon: number;
}

export interface Service {
  id: string;
  title: string;
  image: string;
  description: string;
  startingPrice: string;
  features: string[];
  providers?: Provider[];
  provider?: Provider;
  location?: string;
  locationCoords?: { lat: number; lon: number } | null;
}

export interface BookingDetails {
  date: string;
  time: string;
  address: string;
  description: string;
  urgency: string;
}

export interface LocationState {
  locationText: string;
  coords: { lat: number; lon: number } | null;
}
