"use client";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import { toast, ToastContainer } from "react-toastify";
import Rodal from "rodal";

interface ServicesType {
  id: string;
  name: string;
  time: string;
  price: string;
}

export default function Services() {
  const [services, setServices] = useState<ServicesType[]>([]);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [isRodalOpen, setIsRodalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState("");

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

  const addService = async () => {
    if (!name || !time || !price) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring");
      return;
    }

    if (current === "") {
      const { error } = await supabase.from("BarberShop_Services").insert([
        {
          name,
          time,
          price,
        },
      ]);

      if (!error) {
        toast.success("Xizmat muvaffaqiyatli qo‘shildi");
      } else {
        toast.error("Xizmat qo‘shishda xatolik yuz berdi");
      }
    } else {
      const { error } = await supabase
        .from("BarberShop_Services")
        .update({
          name,
          time,
          price,
        })
        .eq("id", current);

      if (!error) {
        toast.success("Xizmat yangilandi");
      } else {
        toast.error("Yangilashda xatolik yuz berdi");
      }
    }

    setName("");
    setTime("");
    setPrice("");
    setCurrent("");
    setIsRodalOpen(false);
    fetchServices();
  };

  const UpdateServices = (itm: ServicesType) => {
    setCurrent(itm.id);
    setName(itm.name);
    setTime(itm.time);
    setPrice(itm.price);
    setIsRodalOpen(true);
    setLoading(true);
  };

  const DeleteServices = async (id: string) => {
    setLoading(true);
    const { error } = await supabase
      .from("BarberShop_Services")
      .delete()
      .eq("id", id);

    if (!error) {
      toast.success("Xizmat o'chirildi");
      fetchServices();
    } else {
      toast.error("O'chirishda xatolik yuz berdi");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full overflow-y-scroll p-6 text-white">
      <ToastContainer />
      <div className="flex items-center justify-between border-b border-[#e0a96d] pb-4 mb-6">
        <h1 className="text-3xl font-semibold">Services</h1>
        <button
          onClick={() => setIsRodalOpen(true)}
          className="bg-[#e0a96d] hover:bg-[#d1995c] text-black px-4 py-2 rounded-md flex items-center gap-2 font-medium transition duration-200"
        >
          Add Service
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="bg-[#2c2c2c] p-4 rounded-lg shadow-md border border-[#444] animate-pulse"
              >
                <div className="h-6 bg-[#444] mb-3 rounded w-2/3"></div>
                <div className="h-4 bg-[#444] mb-2 rounded w-full"></div>
                <div className="h-4 bg-[#444] rounded w-1/2"></div>
              </div>
            ))
          : services.map((service: ServicesType) => (
              <div
                key={service.id}
                className="bg-[#2c2c2c] p-4 rounded-lg shadow-md border border-[#e0a96d] flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold mb-1">{service.name}</h2>
                  <p className="text-sm text-gray-300">Time: {service.time}</p>
                  <p className="text-sm text-gray-300">
                    Price: {service.price} so'm
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => UpdateServices(service)}
                    className="p-2 rounded-md bg-[#3b3b3b] hover:bg-[#4f4f4f] text-[#e0a96d] transition duration-150"
                  >
                    <FaUserEdit size={18} />
                  </button>
                  <button
                    onClick={() => DeleteServices(service.id)}
                    className="p-2 rounded-md bg-[#3b3b3b] hover:bg-red-600 text-[#e0a96d] transition duration-150"
                  >
                    <TiUserDeleteOutline size={20} />
                  </button>
                </div>
              </div>
            ))}
      </div>

      <Rodal
        visible={isRodalOpen}
        onClose={() => setIsRodalOpen(false)}
        height={400}
        customStyles={{
          background: "#1f1f1f",
          color: "#fff",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <div>
          <h2 className="text-xl font-bold mb-4 text-center text-[#e0a96d]">
            Add Service
          </h2>
          <input
            className="w-full mb-3 px-4 py-2 rounded-md bg-[#2c2c2c] text-white border border-[#e0a96d] focus:outline-none"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter service name..."
          />
          <input
            className="w-full mb-3 px-4 py-2 rounded-md bg-[#2c2c2c] text-white border border-[#e0a96d] focus:outline-none"
            onChange={(e) => setTime(e.target.value)}
            value={time}
            type="text"
            placeholder="Enter time (e.g. 30 minutes)..."
          />
          <input
            className="w-full mb-4 px-4 py-2 rounded-md bg-[#2c2c2c] text-white border border-[#e0a96d] focus:outline-none"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Enter price..."
          />
          <button
            onClick={addService}
            className="w-full bg-[#e0a96d] hover:bg-[#d1995c] transition duration-200 py-2 rounded-md font-semibold text-black"
          >
            Save Service
          </button>
        </div>
      </Rodal>
    </div>
  );
}
