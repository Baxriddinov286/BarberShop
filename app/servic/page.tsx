"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ContactSection from "../_Components/ContactSection";
import Navbar from "../_Components/Navbar";
import { createClient } from "@/supabase/client";

type ServicesType = {
  id: number;
  name: string;
  time: number;
  price: number;
};

export default function Page() {
  const [services, setServices] = useState<ServicesType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("BarberShop_Services")
      .select("*");
    if (!error && data) {
      setServices(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="min-h-screen text-white py-16 px-4 bg-opacity-90">
        <div className="max-w-[1537px] mx-auto">
          <h1 className="text-5xl font-bold text-center mb-16 tracking-wide text-white">
            SERVICES
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
            {loading
              ? [...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-yellow-500 rounded-xl p-6 bg-neutral-900 animate-pulse"
                  >
                    <div className="h-20 bg-neutral-800 rounded mb-4"></div>
                    <div className="h-6 bg-neutral-800 rounded mb-2 w-2/3"></div>
                    <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
                  </div>
                ))
              : services.map((service) => (
                  <div
                    key={service.id}
                    className="border border-yellow-500 rounded-xl p-6 text-center bg-gradient-to-br from-neutral-900 to-black hover:shadow-yellow-500/20 transition-transform hover:-translate-y-1 hover:scale-[1.03] cursor-pointer"
                    onClick={() => router.push(`/services/${service.id}`)}
                  >
                    <Image
                      src="/icon scissors.svg"
                      alt="Service Icon"
                      width={60}
                      height={60}
                      className="mx-auto mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">
                      {service.name}
                    </h2>
                    <p className="text-sm text-gray-400 mb-1">
                      ⏱ Duration: {service.time} mins
                    </p>
                    <p className="text-lg text-yellow-400 font-bold">
                      {service.price}$
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <ContactSection />
    </div>
  );
}
