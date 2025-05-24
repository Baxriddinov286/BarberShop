"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../_Components/Navbar";
import { createClient } from "@/supabase/client";

interface BookingType {
  userId: string;
  servicesId: string;
  date: string;
  time: string;
  master: string;
  name: string;
  phone: string;
}

export default function Page() {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const supabase = createClient();

  const fetchBookings = async () => {
    const { data, error } = await supabase.from("BarberShop_Book").select("*");
    if (error) {
      console.log(error);
    } else {
      setBookings(data);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("userId");
  };

  return (
    <div className="home min-h-screen bg-cover bg-center text-white">
      <Navbar />
      <div className="max-w-[1537px] min-h-screenax-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-10 border-b pb-2 border-gray-500">
          👤 Mening Profilim
        </h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">💈 Bronlarim</h2>
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <p className="text-gray-300">Sizda hali bron mavjud emas.</p>
            ) : (
              bookings.map((booking, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm shadow-md"
                >
                  <p className="text-lg font-medium">
                    ✂️ Sartarosh: {booking.master}
                  </p>
                  <p className="text-sm text-gray-300">
                    📅 {booking.date}, 🕒 {booking.time}
                  </p>
                  <p className="text-sm text-gray-400">
                    👤 {booking.name} | 📞 {booking.phone}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300"
        >
          🔓 Chiqish
        </button>
      </div>
    </div>
  );
}
