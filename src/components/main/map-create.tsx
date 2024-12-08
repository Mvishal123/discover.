"use client";

import { SuggestedPlacesType } from "@/types/map";
import useDebounce from "@/utils/debounce";
import { locationIcon } from "@/utils/discover";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Input } from "../ui/input";
import { Leaf } from "lucide-react";
import { LeafletEvent } from "leaflet";

type MapDetails = {
  name: string;
  address: string;
  coordinates: [number, number];
  state: string;
  city: string;
  country: string;
};

const MapCreate = () => {
  const [coordiantes, setCoordinates] = useState<[number, number]>([
    51.505, -0.09,
  ]);
  const [details, setDetails] = useState<MapDetails>({
    address: "",
    state: "",
    country: "",
    coordinates: [0, 0],
    name: "",
    city: "",
  });
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearchValue = useDebounce(searchValue);

  const {
    data: searchSuggestions,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["search", debouncedSearchValue],
    queryFn: async () => {
      if (!debouncedSearchValue) return [];
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${debouncedSearchValue}`,
      );
      if (!res.data) return [];
      else {
        return res.data.map((place: any) => ({
          placeId: place.place_id,
          coordinates: [place.lat, place.lon],
          address: place.display_name,
        })) as SuggestedPlacesType[];
      }
    },
  });

  const dragHander = async (e: LeafletEvent) => {
    const marker = e.target;
    const position = marker.getLatLng();

    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`,
    );
    // console.log("DETAILS", details.data);

    setDetails((prev) => ({
      ...prev,
      address: res.data.display_name,
      coordinates: [position.lat, position.lng],
      state: res.data.address.state,
      country: res.data.address.country,
      city: res.data.address.city,
    }));
  };

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setDetails((prev) => ({
          ...prev,
          coordinates: [position.coords.latitude, position.coords.longitude],
        }));
      });
    }
  };
  const getStateCountry = async (cs: [number, number]) => {
    if (details.coordinates[0] && details.coordinates[1]) {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${cs[0]}&lon=${cs[1]}`,
      );
      console.log("RES", res.data);

      setDetails((prev) => ({
        ...prev,
        state: res.data.address.state,
        country: res.data.address.country,
        city: res.data.address.city,
      }));
    }
  };

  useEffect(() => {
    setCurrentLocation();
  }, []);

  console.log("DETAILS", details);

  return (
    <div className="flex h-screen flex-col px-12">
      {/* toolbar */}
      <div className="mt-16">
        <div className="relative max-w-[400px]">
          <Input
            placeholder="Search places"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchSuggestions &&
            searchSuggestions.length > 0 &&
            searchValue.length > 0 && (
              <div className="absolute inset-x-0 z-[999] max-h-[400px] translate-y-2 divide-y overflow-auto rounded-lg border bg-white p-2 shadow-lg">
                {searchSuggestions.map((suggestion) => (
                  <button
                    className="my-2 flex w-full justify-start truncate text-wrap p-2 text-start text-sm"
                    key={suggestion.placeId}
                    onClick={async () => {
                      setDetails((prev) => ({
                        ...prev,
                        address: suggestion.address,
                        coordinates: suggestion.coordinates,
                      }));
                      setSearchValue("");
                      getStateCountry([
                        suggestion.coordinates[0],
                        suggestion.coordinates[1],
                      ]);
                    }}
                  >
                    {suggestion.address}
                  </button>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* map */}
      <MapContainer
        key={details.coordinates[0]}
        className="relative mt-8 h-[80%] rounded-3xl shadow-xl"
        center={details.coordinates}
        zoom={15}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker
          position={details.coordinates}
          icon={locationIcon}
          title="You are here"
          draggable={true}
          eventHandlers={{
            dragend: dragHander,
          }}
        />
      </MapContainer>
    </div>
  );
};

export default MapCreate;
