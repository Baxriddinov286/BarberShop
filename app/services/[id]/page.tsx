"use client";
import Navbar from "@/app/_Components/Navbar";
import { createClient } from "@/supabase/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ServicesType {
  id: string;
  name: string;
  time: string;
  price: string;
}

interface MasterType {
  id: string;
  name: string;
  skills: string;
  phone: string;
  work: boolean;
}

export default function Page() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const [services, setServices] = useState<ServicesType[]>([]);
  const [masters, setMasters] = useState<MasterType[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("BarberShop_Services")
      .select("*")
      .eq("id", id);

    if (!error && data) {
      setServices(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchServices();
    }
  }, [id]);

  const fetchMasters = async () => {
    const { data, error } = await supabase
      .from("BarberShop_Masters")
      .select("*");
    if (!error && data) {
      setMasters(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMasters();
  }, []);

  // services va masters yuklangach filteredMasters ni hisoblaymiz
  const filteredMasters = masters.filter((master) =>
    services.some((service) =>
      master.skills.toLowerCase().includes(service.name.toLowerCase())
    )
  );

  return (
    <div className="home min-h-screen bg-[#121212]">
      <Navbar />
      <div className="max-w-[1537px] mx-auto p-4 flex flex-col gap-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-[#2c2c2c] p-6 rounded-2xl shadow-xl border border-[#444] animate-pulse"
              >
                <div className="h-6 bg-[#444] mb-4 rounded w-2/3"></div>
                <div className="h-4 bg-[#444] mb-2 rounded w-full"></div>
                <div className="h-4 bg-[#444] rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px] px-4">
            <div className="bg-neutral-800 border border-gray-700 p-6 rounded-xl text-center max-w-md w-full shadow-md">
              <p className="text-white text-xl font-semibold mb-2">
                Xizmatlar topilmadi
              </p>
              <p className="text-gray-400 text-sm">
                Hozircha bu foydalanuvchiga hech qanday xizmat biriktirilmagan.
                Iltimos, qaytadan urinib ko‘ring yoki boshqa ID tanlang.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="relative group bg-neutral-900 border border-gray-700 rounded-2xl overflow-hidden shadow-xl transition-transform transform hover:scale-105 duration-300"
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-yellow-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 p-6">
                    <h2 className="text-2xl font-bold text-white mb-3 truncate">
                      {service.name}
                    </h2>
                    <p className="text-sm text-gray-400 mb-2">
                      ⏱ Davomiyligi: {service.time} daqiqa
                    </p>
                    <p className="text-lg font-semibold text-yellow-400">
                      {service.price}$
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="w-full lg:w-1/4 mx-auto p-4 border border-gray-700 bg-transparent rounded-lg flex flex-col gap-3">
          <input
            type="date"
            min="2025-05-25"
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder-white "
          />

          <select className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 ">
            {masters.map((itm) => {
              const name = itm.name;
              const capitalizedName =
                name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
              return (
                <option
                  key={name}
                  value={name}
                  className="bg-gray-900 text-white"
                >
                  {capitalizedName}
                </option>
              );
            })}
          </select>

          <input
            type="text"
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400"
            placeholder="Vaqtni kiriting"
          />

          <button className="w-full py-2 bg-transparent border transition text-white font-semibold tracking-wide rounded">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
