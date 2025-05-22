import Image from "next/image";
import React from "react";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div className="h-screen home">
      <Navbar />
      <div id="#home" className="flex justify-center items-center -mt-10 h-full px-4">
        <Image
          src="/Logo.svg"
          alt="Barber"
          width={800}
          height={100}
          className="w-full max-w-[800px] h-auto"
        />
      </div>
    </div>
  );
}
