export type SuggestedPlacesType = {
  placeId: string;
  coordinates: [number, number];
  address: string;
};

export type LocationData = {
  city: string;
  country: string;
  coordiantes: [number, number];
};

export type MapDetails = {
  address: string;
  coordinates: [number, number];
  state?: string;
  city?: string;
  country?: string;
};
