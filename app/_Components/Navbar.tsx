"use client";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const getLinkClass = (name: string) =>
    `hover:text-white duration-500 ${
      activeMenu === name ? "text-white" : "text-[#979797]"
    }`;

  return (
    <div className="relative max-w-[1537px] mx-auto p-4 bg-transparent text-white">
      <div className="flex justify-between items-center h-[50px]">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        <ul className="hidden md:flex items-center gap-5 text-sm md:text-base cursor-pointer font-black">
          <li
            className={getLinkClass("Home")}
            onClick={() => {
              setActiveMenu("Home"), (location.href = "/");
            }}
          >
            Home
          </li>
          <li
            className={getLinkClass("Services")}
            onClick={() => {
              setActiveMenu("Services"), (location.href = "/servic");
            }}
          >
            Services
          </li>
          <li
            className={getLinkClass("About Us")}
            onClick={() => setActiveMenu("About Us")}
          >
            About Us
          </li>
          <li
            className={getLinkClass("Contact Us")}
            onClick={() => setActiveMenu("Contact Us")}
          >
            Contact Us
          </li>
        </ul>

        {isLoggedIn ? (
          <button className="text-sm md:text-base px-4 py-1 border rounded-sm font-bold hidden md:block">
            Profile
          </button>
        ) : (
          <Link
            className="text-sm md:text-base px-4 py-1 border rounded-sm font-bold hidden md:block"
            href="/sign-in"
          >
            Sign In
          </Link>
        )}
      </div>

      {menuOpen && (
        <ul className="absolute top-[60px] left-0 right-4 z-50 p-4 rounded-md flex flex-col gap-3 md:hidden text-sm font-black text-[#979797] shadow-lg bg-[#0f0f0f]">
          <li
            className={getLinkClass("Home")}
            onClick={() => setActiveMenu("Home")}
          >
            Home
          </li>
          <li
            className={getLinkClass("Services")}
            onClick={() => setActiveMenu("Services")}
          >
            Services
          </li>
          <li
            className={getLinkClass("About Us")}
            onClick={() => setActiveMenu("About Us")}
          >
            About Us
          </li>
          <li
            className={getLinkClass("Contact Us")}
            onClick={() => setActiveMenu("Contact Us")}
          >
            Contact Us
          </li>

          {isLoggedIn ? (
            <button className="text-sm px-4 py-1 border rounded-sm font-bold text-white w-fit">
              Profile
            </button>
          ) : (
            <Link
              className="text-sm px-4 py-1 border rounded-sm font-bold text-white w-fit"
              href="/sign-in"
            >
              Sign In
            </Link>
          )}
        </ul>
      )}
    </div>
  );
}
