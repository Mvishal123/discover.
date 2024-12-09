export type SuggestedPlacesType = {
  placeId: string;
  coordinates: [number, number];
  address: string;
};

export type LocationData = {
  name: string;
  city: string;
  country: string;
  coordiantes: [number, number];
};

export type MapDetails = {
  name: string;
  address: string;
  coordinates: [number, number];
  state?: string;
  city?: string;
  country?: string;
};