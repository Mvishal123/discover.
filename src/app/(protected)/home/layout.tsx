import Sidebar from "@/components/main/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full h-full pl-[60px] ">{children}</main>
    </div>
  );
};

export default layout;
