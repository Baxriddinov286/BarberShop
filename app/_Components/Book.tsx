"use client";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

interface BookType {
  id: string;
  userId: string;
  servicesId: string;
  date: string;
  time: string;
  master: string;
  name: string;
  phone: string;
}

interface ServicesType {
  id: string;
  name: string;
  time: string;
  price: string;
}

export default function Book() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [services, setServices] = useState<ServicesType[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const fetchBooks = async () => {
    const { data, error } = await supabase.from("BarberShop_Book").select("*");
    if (!error && data) {
      setBooks(data);
    }
    setLoading(false);
  };

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
    fetchBooks();
    fetchServices();
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll p-6 text-white ">
      <ToastContainer />
      <div className="flex items-center justify-between border-b border-yellow-500 pb-4 mb-6">
        <h1 className="text-4xl font-extrabold tracking-wide text-yellow-400">
          Book
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="w-full h-full overflow-y-scroll p-6 text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="bg-[#2c2c2c] p-6 rounded-lg shadow-md border border-[#444] animate-pulse"
              >
                <div className="h-6 bg-[#444] mb-4 rounded w-2/3"></div>
                <div className="h-4 bg-[#444] mb-3 rounded w-full"></div>
                <div className="h-4 bg-[#444] mb-3 rounded w-1/2"></div>
                <div className="h-4 bg-[#444] rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {books.length === 0 && (
              <p className="text-gray-400 text-center col-span-full text-lg">
                Hozircha bronlar mavjud emas
              </p>
            )}
            {books.map((book) => {
              const service = services.find((s) => s.id === book.servicesId);

              return (
                <div
                  key={book.id}
                  className="p-6 border border-yellow-500 rounded-xl shadow-xl"
                >
                  <p className="text-yellow-300 font-semibold text-lg mb-1">
                    Master:{" "}
                    <span className="text-white font-bold">{book.master}</span>
                  </p>
                  <p className="text-yellow-300 font-semibold text-lg mb-1">
                    Client Name:{" "}
                    <span className="text-white font-bold">{book.name}</span>
                  </p>
                  <p className="text-gray-400 mb-1">Phone: {book.phone}</p>
                  <p className="text-gray-400 mb-1">Date: {book.date}</p>
                  <p className="text-gray-400 mb-4">Time: {book.time}</p>

                  {service ? (
                    <>
                      <p className="text-yellow-300 font-semibold text-lg mb-1">
                        Service:{" "}
                        <span className="text-white font-bold">
                          {service.name}
                        </span>
                      </p>
                      <p className="text-gray-400 mb-1">
                        Price: {service.price}$
                      </p>
                      <p className="text-gray-400">Duration: {service.time}</p>
                    </>
                  ) : (
                    <p className="text-red-500 font-semibold">
                      Service ma'lumotlari topilmadi
                    </p>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
