"use client";


import React, { useCallback, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { Button } from "./ui/button";

// Add this new component to handle map updates
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

const CreateDiscover: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [position, setPosition] = useState<[number, number] | null>(null) ;
  const [lat, setLat] = useState<string>("51.505");
  const [lng, setLng] = useState<string>("-0.09");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // Add debounced search function
  const debouncedFetchSuggestions = useCallback(
    debounce((query: string) => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query,
        )}`,
      )
        .then((response) => response.json())
        .then((data) => setSuggestions(data))
        .catch((error) =>
          console.error("Error fetching location suggestions:", error),
        );
    }, 300),
    [],
  );

  // Update the handler to use debounced function
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchSuggestions(query);
  };

  // Add debounce utility function
  function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number,
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const handleSuggestionClick = (suggestion: any) => {
    const latNum = parseFloat(suggestion.lat);
    const lonNum = parseFloat(suggestion.lon);
    const newPosition: [number, number] = [latNum, lonNum];
    setPosition(newPosition);
    setLat(latNum.toFixed(6));
    setLng(lonNum.toFixed(6));
    setSearchQuery(suggestion.display_name);
    setSuggestions([]); // Clear suggestions
  };

  const addressFromCoordinates = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
    );
    const data = await response.json();
    console.log("data", data);
    return data;
  };

  const handleSubmit = () => {
    console.log({
      name,
      description,
      image,
      position,
      searchQuery,
    });
  };

  const currentLocationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(async (position) => {
      const address = await addressFromCoordinates(
        position.coords.latitude,
        position.coords.longitude,
      );
      setPosition([position.coords.latitude, position.coords.longitude]);
      setSearchQuery(address.display_name);
    });
  };

  return (
    <div>
      <h1>Create Discover</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <div>
          <label>Search Location:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search for a location"
          />
          {suggestions.length > 0 && (
            <ul
              style={{
                border: "1px solid #ccc",
                maxHeight: "150px",
                overflowY: "auto",
              }}
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  style={{ cursor: "pointer", padding: "5px" }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <Button onClick={currentLocationHandler}>
            Choose current location
          </Button>
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="text"
            value={lat}
            onChange={(e) => {
              setLat(e.target.value);
              setPosition([parseFloat(e.target.value), position?.[1] || 0]);
            }}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="text"
            value={lng}
            onChange={(e) => {
              setLng(e.target.value);
              setPosition([position?.[0] || 0, parseFloat(e.target.value)]);
            }}
          />
        </div>
      </form>
      <MapContainer
        center={position || [51.505, -0.09]}
        zoom={16}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {position && (
          <>
            <Marker
              position={position}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const latitude = e.target.getLatLng().lat;
                  const longitude = e.target.getLatLng().lng;
                  setLat(latitude.toFixed(6));
                  setLng(longitude.toFixed(6));
                  setPosition([latitude, longitude]);
                  addressFromCoordinates(latitude, longitude);
                },
              }}
            />
            <MapUpdater center={position} />
          </>
        )}
      </MapContainer>
      <button type="button" onClick={handleSubmit}>
        Save Discover
      </button>
    </div>
  );
};

export default CreateDiscover;
