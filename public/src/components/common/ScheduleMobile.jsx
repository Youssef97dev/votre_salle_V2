import AnimateHeight from "react-animate-height";
import React, { useState } from "react";

import SearchAddress from "../SearchScheduler/SearchAddress";
import SearchBeds from "../SearchScheduler/SearchBeds";

import { addDays } from "date-fns";
import { userAppStore } from "airbnb/store/store";
import { useRouter } from "next/navigation";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Calender from "./Calender";

const ScheduleMobile = () => {
  const [active2, setActive2] = useState("1");
  const togglePara2 = (value) => {
    setActive2((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  const router = useRouter();
  const {
    selectionType,
    setSelectionType,
    setShowScheduleBar,
    showScheduleBar,
  } = userAppStore();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  function formatDate(dateString) {
    const options = { month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  const handleSearch = () => {
    setSelectionType(undefined);
    router.push("/search");
    if (showScheduleBar) {
      setShowScheduleBar();
    }
  };

  return (
    <div className="relative h-full w-full  bg-[#F7F7F7] px-2 pt-5 overflow-hidden">
      <div className="w-full h-full overflow-auto  mt-4 pb-8">
        <div className="mb-5">
          <div className="space-y-4 font-semibold">
            <div className="border border-[#d3d3d3] rounded-lg shadow-lg">
              <button
                type="button"
                className={`p-3 w-full flex items-center ${
                  active2 === "1" ? "text-slate-600" : "text-[#000]"
                }`}
                onClick={() => {
                  togglePara2("1");
                  setSelectionType("where");
                }}
              >
                Destination
                <div
                  className={`ml-auto ${active2 === "1" ? "rotate-180" : ""} `}
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
                  height={active2 === "1" ? "auto" : 0}
                >
                  <div className="p-4 text-white-dark text-[13px] border-t border-[#d3d3d3]">
                    <SearchAddress />
                  </div>
                </AnimateHeight>
              </div>
            </div>
            <div className="border border-[#d3d3d3] rounded-lg shadow-lg">
              <button
                type="button"
                className={`p-3 w-full flex items-center ${
                  active2 === "2" ? "text-slate-600" : "text-[#000]"
                }`}
                onClick={() => togglePara2("2")}
              >
                Reservation Date
                <div
                  className={`ml-auto ${active2 === "2" ? "rotate-180" : ""} `}
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
                  height={active2 === "2" ? "auto" : 0}
                >
                  <div className="p-4 text-white-dark text-[13px] ">
                    <div
                      onClick={() => setSelectionType("check-in")}
                      className="border border-[#000] flex flex-row gap-5 hover:bg-gray-100 px-5 py-2 rounded-xl cursor-pointer items-center justify-around"
                    >
                      <div className="flex flex-col xxs:flex-row xxs:gap-2 xxs:items-center">
                        <label className="text-xs font-semibold flex flex-col">
                          Check in |
                        </label>
                        <span className="text-stone-500">
                          {formatDate(state[0]?.startDate)}
                        </span>
                      </div>
                      <div className="flex flex-col xxs:flex-row xxs:gap-2 xxs:items-center">
                        <label className="text-xs font-semibold flex flex-col">
                          Check out |
                        </label>
                        <span className="text-stone-500">
                          {formatDate(state[0]?.endDate)}
                        </span>
                      </div>
                    </div>
                    {selectionType === "check-in" && (
                      <div className="w-full overflow-x-auto">
                        <Calender state={state} setState={setState} />
                      </div>
                    )}
                  </div>
                </AnimateHeight>
              </div>
            </div>
            <div className="border border-[#d3d3d3] rounded-lg shadow-lg">
              <button
                type="button"
                className={`p-3 w-full flex items-center ${
                  active2 === "3" ? "text-slate-600" : "text-[#000]"
                }`}
                onClick={() => {
                  togglePara2("3");
                  setSelectionType("who");
                }}
              >
                Guests Search
                <div
                  className={`ml-auto ${active2 === "3" ? "rotate-180" : ""} `}
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
                  height={active2 === "3" ? "auto" : 0}
                >
                  <div className="p-4 text-white-dark text-[13px] border-t border-[#d3d3d3]">
                    <SearchBeds />
                  </div>
                </AnimateHeight>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<button
        className="absolute top-3 left-3 cursor-pointer"
        onClick={setShowScheduleBar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width={30}
          height={30}
          viewBox="0 0 32 32"
        >
          <path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 12.21875 10.78125 L 10.78125 12.21875 L 14.5625 16 L 10.78125 19.78125 L 12.21875 21.21875 L 16 17.4375 L 19.78125 21.21875 L 21.21875 19.78125 L 17.4375 16 L 21.21875 12.21875 L 19.78125 10.78125 L 16 14.5625 Z"></path>
        </svg>
              </button>*/}
      <div className="absolute flex flex-row font-medium text-white shadow-2xl px-1 py-2 bg-white gap-2 justify-between bottom-0 left-0 border border-[#d3d3d3] w-full h-16">
        <button
          onClick={setShowScheduleBar}
          className="w-full rounded-xl bg-orange-600"
        >
          Cancel
        </button>
        <button onClick={handleSearch} className="w-full rounded-xl bg-sky-900">
          Search
        </button>
      </div>
    </div>
  );
};

export default ScheduleMobile;
