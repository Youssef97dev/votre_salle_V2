import AnimateHeight from "react-animate-height";
import React, { useState } from "react";

import { userAppStore } from "airbnb/store/store";
import { useRouter } from "next/navigation";

const Prestation = ({ data, setShowPrestation }) => {
  const router = useRouter();
  const [active, setActive] = useState("1");
  const togglePara = (value) => {
    setActive((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  return (
    <div className="relative h-[80%] w-[40%] rounded-lg  bg-[#F7F7F7] px-2 pt-5 overflow-hidden">
      <div className="w-full h-full overflow-auto  mt-4 pb-8">
        <div className="mb-5">
          <div className="space-y-4 font-semibold">
            <div className="border border-[#d3d3d3] rounded-lg shadow-lg">
              <button
                type="button"
                className={`p-3 w-full flex items-center ${
                  active === "1" ? "text-slate-600" : "text-[#000]"
                }`}
                onClick={() => {
                  togglePara("1");
                }}
              >
                Pose Café
                <div
                  className={`ml-auto ${active === "1" ? "rotate-180" : ""} `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                    <path d="M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z" />
                  </svg>
                </div>
              </button>
              <div>
                <AnimateHeight
                  duration={300}
                  height={active === "1" ? "auto" : 0}
                >
                  <div className="p-4 text-white-dark border-t border-[#d3d3d3] gap-2 flex flex-col">
                    <div className="flex gap-8">
                      <textarea
                        placeholder="Description"
                        className="border border-gray-400 h-12 w-full rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        type="number"
                        className="border border-gray-400 rounded-lg"
                      />
                    </div>
                    <div className="flex gap-8">
                      <textarea
                        placeholder="Description"
                        className="border border-gray-400 h-12 w-full rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        type="number"
                        className="border border-gray-400 rounded-lg"
                      />
                    </div>
                    <div className="flex gap-8">
                      <textarea
                        placeholder="Description"
                        className="border border-gray-400 h-12 w-full rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        placeholder="Price"
                        type="number"
                        className="border border-gray-400 rounded-lg"
                      />
                    </div>
                    <div className="flex gap-8">
                      <textarea
                        placeholder="Description"
                        className="border border-gray-400 h-12 w-full rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        type="number"
                        className="border border-gray-400 rounded-lg"
                      />
                    </div>
                    <div className="flex gap-8">
                      <textarea
                        placeholder="Description"
                        className="border border-gray-400 h-12 w-full rounded-lg active:border-gray-950 p-1  no-scrollbar text-base"
                      ></textarea>
                      <input
                        type="number"
                        className="border border-gray-400 rounded-lg"
                      />
                    </div>
                  </div>
                </AnimateHeight>
              </div>
            </div>
            <div className="border border-[#d3d3d3] rounded-lg shadow-lg">
              <button
                type="button"
                className={`p-3 w-full flex items-center ${
                  active === "2" ? "text-slate-600" : "text-[#000]"
                }`}
                onClick={() => togglePara("2")}
              >
                Reservation Date
                <div
                  className={`ml-auto ${active === "2" ? "rotate-180" : ""} `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                    <path d="M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z" />
                  </svg>
                </div>
              </button>
              <div>
                <AnimateHeight
                  duration={300}
                  height={active === "2" ? "auto" : 0}
                >
                  <div className="p-4 text-white-dark text-[13px] ">testtt</div>
                </AnimateHeight>
              </div>
            </div>
            <div className="border border-[#d3d3d3] rounded-lg shadow-lg">
              <button
                type="button"
                className={`p-3 w-full flex items-center ${
                  active === "3" ? "text-slate-600" : "text-[#000]"
                }`}
                onClick={() => {
                  togglePara("3");
                }}
              >
                Guests Search
                <div
                  className={`ml-auto ${active === "3" ? "rotate-180" : ""} `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                    <path d="M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z" />
                  </svg>
                </div>
              </button>
              <div>
                <AnimateHeight
                  duration={300}
                  height={active === "3" ? "auto" : 0}
                >
                  <div className="p-4 text-white-dark text-[13px] border-t border-[#d3d3d3]">
                    tesst
                  </div>
                </AnimateHeight>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-row font-medium text-white shadow-2xl px-1 py-2 bg-white gap-2 justify-between bottom-0 left-0 border border-[#d3d3d3] w-full h-16">
        <button
          onClick={() => setShowPrestation(false)}
          className="w-full rounded-xl bg-orange-600"
        >
          Cancel
        </button>
        <button className="w-full rounded-xl bg-sky-900">Save</button>
      </div>
    </div>
  );
};

export default Prestation;
