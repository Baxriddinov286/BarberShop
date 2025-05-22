"use client";
import React from "react";
import { MdLocationOn, MdEmail, MdAccessTime } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

export default function ContactSection() {
  return (
    <div className="max-w-[1537px] mx-auto bg-white text-black py-12 px-4 md:px-16 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">CONTACT US</h2>
      <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base mb-10">
        Duis pretium gravida enim, vel maximus ligula fermentum a. Sed rhoncus
        eget ex id egestas. Nam nec nisl placerat, tempus erat a, condimentum
        metus. Nulla nisi.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm md:text-base">
        <div className="flex flex-col items-center">
          <MdLocationOn className="text-yellow-600 text-3xl mb-2" />
          <h3 className="font-bold mb-1">ADDRESS</h3>
          <p>
            304 North Cardinal St.
            <br />
            Dorchester Center, MA 02124
          </p>
        </div>
        <div className="flex flex-col items-center">
          <MdEmail className="text-yellow-600 text-2xl mb-2" />
          <h3 className="font-bold mb-1">EMAIL</h3>
          <p>info@company.com</p>
        </div>
        <div className="flex flex-col items-center">
          <FiPhone className="text-yellow-600 text-2xl mb-2" />
          <h3 className="font-bold mb-1">PHONE</h3>
          <p>
            (+63) 555 1212
            <br />
            (+63) 555 1212
          </p>
        </div>
        <div className="flex flex-col items-center">
          <MdAccessTime className="text-yellow-600 text-2xl mb-2" />
          <h3 className="font-bold mb-1">WORKING HOURS</h3>
          <p>
            Mon - Fri: 10am - 6pm
            <br />
            Sat - Sun: 10am - 6pm
          </p>
        </div>
      </div>

      <hr className="my-10 border-t-[1.5px] border-yellow-300 w-full" />
      <p className="text-sm text-gray-600">© Copyright Barbershop 2024</p>
    </div>
  );
}
