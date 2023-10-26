import { userAppStore } from "airbnb/store/store";
import React from "react";

export default function Price() {
  const { price, setPrice, tax, setTax } = userAppStore();
  return (
    <div className="flex  items-center justify-center text-airbnb-light-black">
      <div className="flex flex-col gap-5">
        {/* <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-4xl">Now, set your price</h2>
          <p>You can change it anytime.</p>
  </div>*/}
        <div className="flex flex-col gap-4 relative">
          <span className="border-r font-medium border-gray-500 pr-1 absolute left-2 top-8 transform -translate-y-1/2 text-xl text-neutral-600">
            MAD
          </span>
          <input
            type="text"
            className="border border-gray-400 w-[550px] rounded-lg active:border-gray-950 p-3 no-scrollbar text-3xl items-center flex justify-center pl-16"
            value={price}
            onChange={(e) => {
              if (e.target.value) {
                setPrice(parseInt(e.target.value));
              } else setPrice(0);
            }}
          />
        </div>
        <div className="flex flex-row gap-3 justify-between font-medium">
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
      </div>
    </div>
  );
}
