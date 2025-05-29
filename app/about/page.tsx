"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../_Components/Navbar";
import ContactSection from "../_Components/ContactSection";
import { createClient } from "@/supabase/client";
import Discount from "../_Components/Discount";
import Image from "next/image";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";

interface MasterType {
  id: string;
  name: string;
  skills: string;
  phone: string;
  work: boolean;
}

export default function page() {
  const [masters, setMasters] = useState<MasterType[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

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

  return (
    <div className="home bg-white">
      <Navbar />
      <div className="max-w-[1537px] mx-auto py-16">
        <h2 className="text-center text-sm text-white font-semibold uppercase">
          About Us
        </h2>
      </div>

      <div className="max-w-[1537px] mx-auto px-4 py-16 bg-white">
        <h2 className="text-4xl font-extrabold text-center mb-14 text-black tracking-wide">
          ✂️ Our Professional Barbers ✂️
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="border border-yellow-500 rounded-3xl p-6 bg-neutral-900 animate-pulse"
              >
                <div className="h-44 bg-neutral-800 rounded-xl mb-4"></div>
                <div className="h-6 bg-neutral-800 rounded mb-2 w-2/3"></div>
                <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {masters.map((master) => (
              <div
                key={master.id}
                className="bg-black text-white rounded-3xl overflow-hidden shadow-xl border border-yellow-500 transition-all duration-300 hover:scale-[1.04] group"
              >
                <div className="h-[320px] barbers flex items-center justify-center text-5xl font-extrabold text-yellow-400 group-hover:bg-gray-700 transition duration-300"></div>

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2 tracking-wide">
                    {master.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 italic">
                    Expert in Fades & Styles
                  </p>

                  <div className="flex justify-center gap-5 my-4 text-xl text-gray-400">
                    <a href="#">
                      <FaTwitter className="text-yellow-400 hover:text-yellow-500 transition duration-200" />
                    </a>
                    <a href="#">
                      <FaSquareFacebook className="text-yellow-400 hover:text-yellow-500 transition duration-200" />
                    </a>
                    <a href="#">
                      <FaInstagram className="text-yellow-400 hover:text-yellow-500 transition duration-200" />
                    </a>
                  </div>

                  <button className="mt-2 px-8 py-2 border-2 border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition duration-300 font-semibold">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Discount />

      <ContactSection />
    </div>
  );
}
