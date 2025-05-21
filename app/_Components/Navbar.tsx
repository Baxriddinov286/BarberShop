"use client";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  return (
    <div className="max-w-[1537px] h-[50px] mx-auto p-4 bg-transparent flex justify-between items-center text-white">
      <GiHamburgerMenu className="text-2xl cursor-pointer" />

      <ul className="flex items-center gap-5 text-sm md:text-base cursor-pointer text-[#979797]">
        <li className="hover:text-white duration-500">Home</li>
        <li className="hover:text-white duration-500">Services</li>
        <li className="hover:text-white duration-500">About Us</li>
        <li className="hover:text-white duration-500">Contact Us</li>
      </ul>

      {isLoggedIn ? (
        <button className="text-sm md:text-base px-4 py-1 border rounded-SM">
          Profile
        </button>
      ) : (
        <Link href="/sign-in">Sign In</Link>
      )}
    </div>
  );
}
