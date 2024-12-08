import Container from "@/components/common/container";
import Header from "@/components/website/header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grainy">
      <Container className="pt-6">
        <Header />
      </Container>
      {children}
    </main>
  );
};

export default Layout;
