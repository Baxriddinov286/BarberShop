"use client";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ServicesType {
  id: string;
  name: string;
  time: string;
  price: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServicesType[]>([]);
  const [loading, setLoading] = useState(true);
  const userouter = useRouter();
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
    <div className="servicesHome min-h-screen  text-white py-16 px-4">
      <div className="max-w-[1537px] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-white">
          Our Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading
            ? [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#2c2c2c] p-6 rounded-2xl shadow-xl border border-[#444] animate-pulse"
                >
                  <div className="h-6 bg-[#444] mb-4 rounded w-2/3"></div>
                  <div className="h-4 bg-[#444] mb-2 rounded w-full"></div>
                  <div className="h-4 bg-[#444] rounded w-1/2"></div>
                </div>
              ))
            : services.map((service) => (
                <div
                  onClick={() => userouter.push(`/services/${service.id}`)}
                  key={service.id}
                  className="relative group bg-neutral-900 border border-gray-700 rounded-2xl overflow-hidden shadow-xl transition transform hover:scale-105 duration-300"
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-yellow-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 p-6">
                    <h2 className="text-2xl font-bold text-white mb-3">
                      {service.name}
                    </h2>
                    <p className="text-sm text-gray-400 mb-2">
                      ⏱ Duration: {service.time} minutes
                    </p>
                    <p className="text-lg font-semibold text-yellow-400">
                      {service.price}$
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
