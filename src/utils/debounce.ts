import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>();

  useEffect(() => {
    const timout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timout);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

export default useDebounce;
