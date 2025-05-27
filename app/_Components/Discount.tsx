import Image from "next/image";
import React from "react";

const Discount = () => {
  return (
    <div className="max-w-[1537px] mx-auto">
      <div className="bg-black text-yellow-500 py-12">
        <div className="flex flex-col md:flex-row justify-around text-center space-y-8 md:space-y-0">
          <div className="flex flex-col items-center">
            <Image
              src="/icon scissors.svg"
              alt="Service Icon"
              width={80}
              height={80}
              className="mb-4"
            />
            <div className="text-5xl font-bold">2500</div>
            <div className="text-white mt-2">SHAVES</div>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icon scissors.svg"
              alt="Service Icon"
              width={80}
              height={80}
              className="mb-4"
            />
            <div className="text-5xl font-bold">4500</div>
            <div className="text-white mt-2">HAIRCUTS</div>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/icon scissors.svg"
              alt="Service Icon"
              width={80}
              height={80}
              className="mb-4"
            />
            <div className="text-5xl font-bold">23</div>
            <div className="text-white mt-2">OPEN SHOPS</div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-500 px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold text-black mb-4">25% DISCOUNT</h2>
          <p className="text-black mb-6">
            Curabitur vulputate arcu odio, ac facilisis diam accumsan ut. Ut
            imperdiet et leo in vulputate. Sed eleifend lacus eu sapien sagittis
            imper.
          </p>
          <button className="bg-black text-white px-6 py-2 font-semibold hover:bg-gray-800 transition">
            BOOK NOW
          </button>
        </div>
        <div className="w-full md:w-1/2 h-64 opacity-40 rounded-lg discount"></div>
      </div>
    </div>
  );
};

export default Discount;
