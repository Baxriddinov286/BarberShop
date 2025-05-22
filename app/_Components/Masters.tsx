"use client";

import { createClient } from "@/supabase/client";
import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { TiUserDeleteOutline } from "react-icons/ti";
import { toast, ToastContainer } from "react-toastify";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

interface MasterType {
  id: string;
  name: string;
  skills: string;
  phone: string;
  work: boolean;
}

export default function Masters() {
  const [masters, setMasters] = useState<MasterType[]>([]);
  const [masterNames, setMasterNames] = useState("");
  const [masterSkills, setMasterSkills] = useState("");
  const [masterPhone, setMasterPhone] = useState("");
  const [isRodalOpen, setIsRodalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState("");

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

  const addMaster = async () => {
    if (!masterNames || !masterSkills || !masterPhone) {
      toast.error("Iltimos ma'lumotlarni to'liq kiriting");
      return;
    }

    const phoneRegex = /^\+998\d{9}$/;
    if (!phoneRegex.test(masterPhone)) {
      toast.error(
        "Telefon raqam formati noto‘g‘ri. +998XXXXXXXXX ko‘rinishida bo‘lishi kerak."
      );
      return;
    }

    if (current === "") {
      const { error } = await supabase.from("BarberShop_Masters").insert([
        {
          name: masterNames,
          skills: masterSkills,
          phone: masterPhone,
          work: true,
        },
      ]);

      if (!error) {
        toast.success("Usta muvaffaqiyatli qo‘shildi");
      } else {
        toast.error("Usta qo‘shishda xatolik yuz berdi");
      }
    } else {
      const { error } = await supabase
        .from("BarberShop_Masters")
        .update({
          name: masterNames,
          skills: masterSkills,
          phone: masterPhone,
          work: true,
        })
        .eq("id", current);

      if (!error) {
        toast.success("Usta ma'lumotlari yangilandi");
      } else {
        toast.error("Yangilashda xatolik yuz berdi");
      }
    }

    setMasterNames("");
    setMasterSkills("");
    setMasterPhone("");
    setCurrent("");
    setIsRodalOpen(false);
    fetchMasters();
  };

  const UpdateMaster = (itm: MasterType) => {
    setCurrent(itm.id);
    setMasterNames(itm.name);
    setMasterSkills(itm.skills);
    setMasterPhone(itm.phone);
    setIsRodalOpen(true);
  };

  const deleteMaster = async (id: string) => {
    setLoading(true);
    const { error } = await supabase
      .from("BarberShop_Masters")
      .delete()
      .eq("id", id);
    if (!error) {
      toast.success("Usta o‘chirildi");
      fetchMasters();
    } else {
      toast.error("O‘chirishda xatolik yuz berdi");
    }
    setLoading(false);
  };

  const toggleBarber = async (id: string, work: boolean) => {
    setLoading(true);
    const { error } = await supabase
      .from("BarberShop_Masters")
      .update({ work: !work })
      .eq("id", id);
    if (!error) {
      fetchMasters();
    } else {
    }
  };

  return (
    <div className="w-full h-full overflow-y-scroll p-6 text-white">
      <ToastContainer />
      <div className="flex items-center justify-between border-b border-[#e0a96d] pb-4 mb-6">
        <h1 className="text-3xl font-semibold">Masters</h1>
        <button
          onClick={() => setIsRodalOpen(true)}
          className="bg-[#e0a96d] hover:bg-[#d1995c] text-black px-4 py-2 rounded-md flex items-center gap-2 font-medium transition duration-200"
        >
          <IoIosPersonAdd size={24} /> Add Master
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
          : masters.map((master: MasterType) => (
              <div
                key={master.id}
                className="bg-[#2c2c2c] p-4 rounded-lg shadow-md border border-[#e0a96d] flex flex-col justify-content-between"
              >
                <div>
                  <h2 className="text-xl font-bold mb-1">{master.name}</h2>
                  <p className="text-sm text-gray-300">
                    Skills: {master.skills}
                  </p>
                  <p className="text-sm text-gray-300">Phone: {master.phone}</p>
                  <div className="flex items-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={master.work}
                        onChange={() => toggleBarber(master.id, master.work)}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                    </label>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {master.work ? "Work" : "Not Work"}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => UpdateMaster(master)}
                    className="p-2 rounded-md bg-[#3b3b3b] hover:bg-[#4f4f4f] text-[#e0a96d] transition duration-150"
                  >
                    <FaUserEdit size={18} />
                  </button>
                  <button
                    onClick={() => deleteMaster(master.id)}
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
        height={320}
        customStyles={{
          background: "#1f1f1f",
          color: "#fff",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <div>
          <h2 className="text-xl font-bold mb-4 text-center text-[#e0a96d]">
            Add Master
          </h2>
          <input
            className="w-full mb-3 px-4 py-2 rounded-md bg-[#2c2c2c] text-white border border-[#e0a96d] focus:outline-none"
            onChange={(e) => setMasterNames(e.target.value)}
            value={masterNames}
            type="text"
            placeholder="Enter name..."
          />
          <input
            className="w-full mb-3 px-4 py-2 rounded-md bg-[#2c2c2c] text-white border border-[#e0a96d] focus:outline-none"
            onChange={(e) => setMasterSkills(e.target.value)}
            value={masterSkills}
            type="text"
            placeholder="Enter skills..."
          />

          <input
            className="w-full mb-4 px-4 py-2 rounded-md bg-[#2c2c2c] text-white border border-[#e0a96d] focus:outline-none"
            onChange={(e) => setMasterPhone(e.target.value)}
            value={masterPhone}
            type="text"
            placeholder="Enter phone..."
          />
          <button
            onClick={addMaster}
            className="w-full bg-[#e0a96d] hover:bg-[#d1995c] transition duration-200 py-2 rounded-md font-semibold text-black"
          >
            Save Master
          </button>
        </div>
      </Rodal>
    </div>
  );
}
