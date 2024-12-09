"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import CreateDiscoverMap from "./create-discover-map";
import { MapDetails } from "@/types/map";
import CreateDiscoverForm from "./create-discover-form";

const CreateDiscover = () => {
  const [details, setDetails] = useState<MapDetails>({
    address: "",
    state: "",
    country: "",
    coordinates: [0, 0],
    city: "",
  });

  



  return (
    <div className="flex h-screen flex-col px-4 md:px-8 lg:px-12 ">
      <div className="mt-16 h-full w-full">
        <CreateDiscoverForm details={details} setDetails={setDetails}>
          <CreateDiscoverMap details={details} setDetails={setDetails} />
        </CreateDiscoverForm>
      </div>
    </div>
  );
};

export default CreateDiscover;
