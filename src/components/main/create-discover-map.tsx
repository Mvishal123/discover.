"use client";

import { MapDetails, SuggestedPlacesType } from "@/types/map";
import useDebounce from "@/utils/debounce";
import { locationIcon } from "@/utils/discover";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LeafletEvent } from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Input } from "../ui/input";

type CreateDiscoverMapProps = {
  setDetails: React.Dispatch<React.SetStateAction<MapDetails>>;
  details: MapDetails;
};

const CreateDiscoverMap = ({ details, setDetails }: CreateDiscoverMapProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue);

  const { data: searchSuggestions } = useQuery({
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

  useEffect(() => {
    const init = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          );

          setDetails((prev) => ({
            ...prev,
            address: res.data.display_name,
            coordinates: [latitude, longitude],
            state: res.data.address.state,
            country: res.data.address.country,
            city: res.data.address.city,
          }));
        });
      }
    };

    init();
  }, []);

  const dragHandler = async (e: LeafletEvent) => {
    const marker = e.target;
    const position = marker.getLatLng();

    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`,
    );

    setDetails((prev) => ({
      ...prev,
      address: res.data.display_name,
      coordinates: [position.lat, position.lng],
      state: res.data.address.state,
      country: res.data.address.country,
      city: res.data.address.city,
    }));
  };

  const getStateCountry = async (cs: [number, number]) => {
    if (details.coordinates[0] && details.coordinates[1]) {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${cs[0]}&lon=${cs[1]}`,
      );

      setDetails((prev) => ({
        ...prev,
        state: res.data.address.state,
        country: res.data.address.country,
        city: res.data.address.city,
      }));
    }
  };

  return (
    <div className="h-full">
      {/* toolbar */}
      <div>
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
        className="relative mt-4 h-[80vh] rounded-3xl shadow-xl"
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
            dragend: dragHandler,
          }}
        />
      </MapContainer>
    </div>
  );
};

export default CreateDiscoverMap;
