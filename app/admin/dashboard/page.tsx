"use client";

import Book from "@/app/_Components/Book";
import Masters from "@/app/_Components/Masters";
import Services from "@/app/_Components/Services";
import Settings from "@/app/_Components/Settings";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [info, setInfo] = useState("Book");

  return (
    <div className="max-w-[1537px] h-screen overflow-y-scroll mx-auto flex bg-[#121212] text-gray-100">
      <div>
        <div className="w-64 h-full px-4 py-6 bg-[#1f1f1f] shadow-2xl">
          <div className="flex flex-col gap-3">
            <div>
              <Image
                onClick={() => (location.href = "/")}
                src={
                  "/Premium Vector _ A mans hair shop logo for barber shop (1).jpg"
                }
                alt="BarberShop"
                width={250}
                height={100}
              />
            </div>
            <button
              onClick={() => setInfo("Book")}
              className={`flex items-center gap-3 px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                info === "Book"
                  ? "bg-[#e0a96d] text-black shadow-md scale-[1.02]"
                  : "bg-[#2c2c2c] text-gray-300 hover:bg-[#3a3a3a]"
              }`}
            >
              Book
            </button>
            <button
              onClick={() => setInfo("Masters")}
              className={`flex items-center gap-3 px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                info === "Masters"
                  ? "bg-[#e0a96d] text-black shadow-md scale-[1.02]"
                  : "bg-[#2c2c2c] text-gray-300 hover:bg-[#3a3a3a]"
              }`}
            >
              Masters
            </button>
            <button
              onClick={() => setInfo("Services")}
              className={`flex items-center gap-3 px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                info === "Services"
                  ? "bg-[#e0a96d] text-black shadow-md scale-[1.02]"
                  : "bg-[#2c2c2c] text-gray-300 hover:bg-[#3a3a3a]"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setInfo("Settings")}
              className={`flex items-center gap-3 px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                info === "Settings"
                  ? "bg-[#e0a96d] text-black shadow-md scale-[1.02]"
                  : "bg-[#2c2c2c] text-gray-300 hover:bg-[#3a3a3a]"
              }`}
            >
              Settings
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 bg-[#181818] rounded-sm">
        {info === "Book" ? (
          <Book />
        ) : info === "Masters" ? (
          <Masters />
        ) : info === "Services" ? (
          <Services />
        ) : info === "Settings" ? (
          <Settings />
        ) : (
          <Book />
        )}
      </div>
    </div>
  );
}
