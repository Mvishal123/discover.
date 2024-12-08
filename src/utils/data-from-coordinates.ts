import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useDataFromCoordinates = (coordinates: [number, number]) => {
  const { data } = useQuery({
    queryKey: ["location", coordinates],
    queryFn: async () => {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates[0]}&lon=${coordinates[1]}`,
      );
      return res.data;
    },
  });
  
  return { data };
};

export default useDataFromCoordinates;
