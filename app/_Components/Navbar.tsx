"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  return (
    <div className="relative max-w-[1537px] mx-auto p-4 bg-transparent text-white">
      <div className="flex justify-between items-center h-[50px]">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        <ul className="hidden md:flex items-center gap-5 text-sm md:text-base cursor-pointer font-black">
          <li
            className="cursor-pointer hover:text-white text-[#979797] duration-500"
            onClick={() => (location.href = "/")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-white text-[#979797] duration-500"
            onClick={() => (location.href = "/servic")}
          >
            Services
          </li>
          <li
            onClick={() => (location.href = "/about")}
            className="cursor-pointer hover:text-white text-[#979797] duration-500"
          >
            About Us
          </li>
          <li className="cursor-pointer hover:text-white text-[#979797] duration-500">
            Contact Us
          </li>
        </ul>

        {isLoggedIn ? (
          <Link
            className="text-decoration-none text-white text-sm md:text-base px-4 py-1 border rounded-sm font-bold hidden md:block"
            href="/profile"
          >
            Profile
          </Link>
        ) : (
          <Link
            className="text-decoration-none text-white text-sm md:text-base px-4 py-1 border rounded-sm font-bold hidden md:block"
            href="/sign-in"
          >
            Sign In
          </Link>
        )}
      </div>

      {menuOpen && (
        <ul className="absolute top-[60px] left-0 right-4 z-50 p-4 rounded-md flex flex-col gap-3 md:hidden text-sm font-black text-[#979797] shadow-lg bg-[#0f0f0f]">
          <li
            className="cursor-pointer hover:text-white duration-500"
            onClick={() => {
              location.href = "/";
              setMenuOpen(false);
            }}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-white duration-500"
            onClick={() => {
              location.href = "/servic";
              setMenuOpen(false);
            }}
          >
            Services
          </li>
          <li
            className="cursor-pointer hover:text-white duration-500"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </li>
          <li
            className="cursor-pointer hover:text-white duration-500"
            onClick={() => setMenuOpen(false)}
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
