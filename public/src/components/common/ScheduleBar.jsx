import { userAppStore } from "airbnb/store/store";
import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
export default function ScheduleBar() {
  const { setShowScheduleBar } = userAppStore();
  return (
    <div
      className="flex items-center justify-center h-full rounded-full shadow-md"
      onClick={setShowScheduleBar}
    >
      <div className="flex items-center gap-3 border p-1 rounded-full w-max font-semibold text-sm">
        <span className="pl-5 cursor-pointer hidden md:block">City</span>
        <span className="text-zinc-600 hidden md:block">|</span>
        <span className="cursor-pointer hidden md:block">Date</span>
        <span className="text-zinc-600 hidden md:block">|</span>
        <span className="cursor-pointer hidden md:block">Guests number</span>
        <span className=" bg-airbnb-theme-color flex items-center justify-center p-2 rounded-full cursor-pointer">
          <HiOutlineSearch className="text-white" />
        </span>
      </div>
    </div>
  );
}
