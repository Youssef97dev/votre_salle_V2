import { userAppStore } from "airbnb/store/store";
import React from "react";

export default function Price() {
  const { price, setPrice, tax, setTax, priceB2b, setPriceB2b } =
    userAppStore();
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-1 w-[95%] lg:w-[38%]">
        <div className="flex flex-col gap-2 w-full relative">
          <span className="border-r font-medium border-gray-500 pr-1 absolute  left-2 top-5 lg:top-8 transform -translate-y-1/2 text-lg  lg:text-xl text-neutral-600">
            MAD B2C
          </span>
          <input
            type="text"
            className="border border-gray-400 w-full rounded-lg active:border-gray-950 p-1 lg:p-3 no-scrollbar text-lg md:text-xl lg:text-3xl items-center flex justify-center pl-28 lg:pl-28"
            value={price}
            onChange={(e) => {
              if (e.target.value) {
                setPrice(parseInt(e.target.value));
              } else setPrice(0);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-full relative">
          <span className="border-r font-medium border-gray-500 pr-1 absolute  left-2 top-5 lg:top-8 transform -translate-y-1/2 text-lg  lg:text-xl text-neutral-600">
            MAD B2B
          </span>
          <input
            type="text"
            className="border border-gray-400 w-full rounded-lg active:border-gray-950 p-1 lg:p-3 no-scrollbar text-lg md:text-xl lg:text-3xl items-center flex justify-center pl-28 lg:pl-28"
            value={priceB2b}
            onChange={(e) => {
              if (e.target.value) {
                setPriceB2b(parseInt(e.target.value));
              } else setPriceB2b(0);
            }}
          />
        </div>
      </div>
      <div className="flex flex-row gap-3 w-[95%] lg:w-[38%] justify-between font-medium">
        <div
          onClick={() => setTax(10)}
          className={`py-4 rounded border w-full cursor-pointer text-center ${
            tax === 10
              ? "bg-[#1b4db98e] border-[#1b4db98e] text-[#fff]"
              : "border-[#9095a086] hover:bg-[#1b4db98e] hover:border-[#1b4db98e] hover:text-[#fff]"
          }`}
        >
          10%
        </div>
        <div
          onClick={() => setTax(20)}
          className={`py-4 rounded border w-full cursor-pointer text-center ${
            tax === 20
              ? "bg-[#1b4db98e] border-[#1b4db98e] text-[#fff]"
              : "border-[#9095a086] hover:bg-[#1b4db98e] hover:border-[#1b4db98e] hover:text-[#fff]"
          }`}
        >
          20%
        </div>
        <div
          onClick={() => setTax(0)}
          className={`py-4 rounded border w-full cursor-pointer text-center ${
            tax === 0
              ? "bg-[#1b4db98e] border-[#1b4db98e] text-[#fff]"
              : "border-[#9095a086] hover:bg-[#1b4db98e] hover:border-[#1b4db98e] hover:text-[#fff]"
          }`}
        >
          Exonerer
        </div>
      </div>
    </>
  );
}
