"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/tanstack";

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackProvider;
