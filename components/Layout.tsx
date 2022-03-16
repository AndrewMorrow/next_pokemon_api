import React from "react";

import Navbar from "./Navbar";

export default function Layout({ children }: { children: any }) {
  
  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  );
}
