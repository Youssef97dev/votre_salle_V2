import { userAppStore } from "airbnb/store/store";
import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import Filter from "../modals/Filter";
export default function ScheduleBar() {
  const { setShowScheduleBar } = userAppStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex items-center justify-center h-full rounded-full shadow-md">
      {isDesktop ? (
        <div
          onClick={setShowScheduleBar}
          className="flex items-center gap-3 border p-1 rounded-full w-max font-semibold text-sm"
        >
          <span className="pl-5 cursor-pointer">City</span>
          <span className="text-zinc-600">|</span>
          <span className="cursor-pointer">Date</span>
          <span className="text-zinc-600">|</span>
          <span className="cursor-pointer">Guests number</span>
          <span className=" bg-airbnb-theme-color flex items-center justify-center p-2 rounded-full cursor-pointer">
            <HiOutlineSearch className="text-white" />
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-1 border p-2 rounded-full w-full font-semibold text-sm justify-between">
          <IoMdSearch size={25} onClick={setShowScheduleBar} />
          <div onClick={setShowScheduleBar} className="flex flex-col">
            <span className="text-sm font-bold">Where to ?</span>
            <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
              Anywhere . Any week . Add guests
            </span>
          </div>
          <div
            onClick={() => setShowFilter(true)}
            className="border border-gray-300 rounded-full p-2 shadow-lg"
          >
            <VscSettings size={15} />
          </div>
          {showFilter && (
            <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
          )}
        </div>
      )}
    </div>
  );
}
