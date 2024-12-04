"use client";

import NextAuthProvider from "./nextauth-provider";
import TanstackProvider from "./tanstack-provider";
import { ThemeProvider } from "./theme-provider";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TanstackProvider>{children}</TanstackProvider>
      </ThemeProvider>
    </NextAuthProvider>
  );
};

export default Providers;
