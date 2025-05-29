"use client";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState } from "react";
import { CiTimer } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { TiUserDeleteOutline } from "react-icons/ti";
import { toast, ToastContainer } from "react-toastify";
import Rodal from "rodal";

interface TimeType {
  id: string;
  value: string;
  label: string;
}

export default function Time() {
  const [Times, setTimes] = useState<TimeType[]>([]);
  const [barberTime, setBarberTime] = useState("");
  const [isRodalOpen, setIsRodalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState("");

  const supabase = createClient();

  const fetchTimes = async () => {
    const { data, error } = await supabase.from("BarberShop_Time").select("*");
    if (!error && data) {
      setTimes(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTimes();
  }, []);

  const handleAddTime = async () => {
    if (!barberTime.trim()) {
      toast.error("Iltimos, vaqtni kiriting.");
      return;
    }

    if (current) {
      const { error } = await supabase
        .from("BarberShop_Time")
        .update({ value: barberTime, label: barberTime })
        .eq("id", current);

      if (!error) {
        toast.success("Vaqt muvaffaqiyatli yangilandi.");
        setBarberTime("");
        setCurrent("");
        setIsRodalOpen(false);
        fetchTimes();
      } else {
        toast.error("Vaqtni yangilashda xatolik yuz berdi.");
      }
    } else {
      const { error } = await supabase
        .from("BarberShop_Time")
        .insert([{ value: barberTime, label: barberTime }]);

      if (!error) {
        toast.success("Vaqt muvaffaqiyatli qo‘shildi.");
        setBarberTime("");
        setIsRodalOpen(false);
        fetchTimes();
      } else {
        toast.error("Vaqt qo‘shishda xatolik yuz berdi.");
      }
    }
  };

  const UpdateTimes = (itm: TimeType) => {
    setCurrent(itm.id);
    setBarberTime(itm.value);
    setIsRodalOpen(true);
  };

  const deleteTime = async (id: string) => {
    setLoading(true);
    const { error } = await supabase
      .from("BarberShop_Time")
      .delete()
      .eq("id", id);
    if (!error) {
      toast.success("Vaqt o‘chirildi");
      fetchTimes();
    } else {
      toast.error("O‘chirishda xatolik yuz berdi");
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-full overflow-y-scroll p-6 text-white">
      <ToastContainer />
      <div className="flex items-center justify-between border-b border-[#e0a96d] pb-4 mb-6">
        <h1 className="text-3xl font-semibold">Times</h1>
        <button
          onClick={() => setIsRodalOpen(true)}
          className="bg-[#e0a96d] hover:bg-[#d1995c] text-black px-4 py-2 rounded-md flex items-center gap-2 font-medium transition duration-200"
        >
          <CiTimer size={24} /> Add Time
        </button>
      </div>

      {loading ? (
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Time</th>
              <th>Label</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td>
                  <div className="h-4 w-24 bg-[#444] animate-pulse rounded"></div>
                </td>
                <td>
                  <div className="h-4 w-24 bg-[#444] animate-pulse rounded"></div>
                </td>
                <td>
                  <div className="flex gap-2">
                    <div className="h-6 w-6 bg-[#444] animate-pulse rounded-md"></div>
                    <div className="h-6 w-6 bg-[#444] animate-pulse rounded-md"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Time</th>
              <th>Label</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Times.map((itm: TimeType) => (
              <tr key={itm.id}>
                <td>{itm.value}</td>
                <td>{itm.label}</td>
                <td>
                  <button
                    onClick={() => UpdateTimes(itm)}
                    className="p-2 rounded-md bg-[#3b3b3b] hover:bg-[#4f4f4f] text-[#e0a96d] transition duration-150"
                  >
                    <FaUserEdit size={18} />
                  </button>
                  <button
                    onClick={() => deleteTime(itm.id)}
                    className="p-2 rounded-md bg-[#3b3b3b] hover:bg-red-600 text-[#e0a96d] transition duration-150 ml-2"
                  >
                    <TiUserDeleteOutline size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
            Add Time
          </h2>
          <input
            className="w-full mb-3 px-4 py-2 rounded-md bg-[#2c2c2c] text-white border border-[#e0a96d] focus:outline-none"
            type="text"
            placeholder="Enter time..."
            value={barberTime}
            onChange={(e) => setBarberTime(e.target.value)}
          />
          <button
            onClick={handleAddTime}
            className="w-full bg-[#e0a96d] hover:bg-[#d1995c] transition duration-200 py-2 rounded-md font-semibold text-black"
          >
            Save Time
          </button>
        </div>
      </Rodal>
    </div>
  );
}
