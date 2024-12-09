"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import CreateDiscoverMap from "./create-discover-map";

type MapDetails = {
  name: string;
  address: string;
  coordinates: [number, number];
  state?: string;
  city?: string;
  country?: string;
};

const CreateDiscover = () => {
  const [details, setDetails] = useState<MapDetails>({
    address: "",
    state: "",
    country: "",
    coordinates: [0, 0],
    name: "",
    city: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setDetails((prev) => ({
          ...prev,
          coordinates: [position.coords.latitude, position.coords.longitude],
        }));
      });
    }
  }, []);

  return (
    <div className="flex h-screen flex-col px-12">
      <div className="mt-16 h-full w-full">
        <CreateDiscoverMap details={details} setDetails={setDetails} />
      </div>
    </div>
  );
};

export default CreateDiscover;
