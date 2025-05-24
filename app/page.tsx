import React from "react";
import Home from "./_Components/Home";
import ServicesPage from "./_Components/ServicesPage";
import ContactSection from "./_Components/ContactSection";
import Discount from "./_Components/Discount";

export default function page() {
  return (
    <div className="h-full">
      <Home />
      <ServicesPage />
      <Discount />
      <ContactSection />
    </div>
  );
}
