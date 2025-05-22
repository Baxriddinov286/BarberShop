import React from "react";
import Home from "./_Components/Home";
import ServicesPage from "./_Components/ServicesPage";
import Navbar from "./_Components/Navbar";
import ContactSection from "./_Components/ContactSection";

export default function page() {
  return (
    <div className="h-full">
      <Home />
      <ServicesPage />
      <ContactSection />
    </div>
  );
}
