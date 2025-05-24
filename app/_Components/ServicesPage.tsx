"use client";
import { createClient } from "@/supabase/client";
import Image from "next/image";
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {loading
            ? [...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-neutral-800 p-5 rounded-xl shadow-md border border-neutral-700 animate-pulse"
                >
                  <div className="h-6 bg-neutral-700 mb-4 rounded w-2/3"></div>
                  <div className="h-4 bg-neutral-700 mb-3 rounded w-full"></div>
                  <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
                </div>
              ))
            : services.map((service) => (
                <div
                  key={service.id}
                  className="group cursor-pointer bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300"
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-yellow-400/10 via-pink-500/10 to-purple-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 p-6 flex flex-col items-center text-center">
                    <Image
                      onClick={() => userouter.push(`/services/${service.id}`)}
                      src="/icon scissors.svg"
                      alt="Service Icon"
                      width={80}
                      height={80}
                      className="mb-4"
                    />
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {service.name}
                    </h2>
                    <p className="text-sm text-gray-400 mb-1">
                      ⏱ Duration: {service.time} mins
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
