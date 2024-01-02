import React, { useState, useEffect } from "react";
import { userAppStore } from "airbnb/store/store";
import { useRouter, usePathname } from "next/navigation";

// icons
import {
  AiOutlineSearch,
  AiOutlineUserAdd,
  AiOutlineHeart,
  AiOutlineHome,
} from "react-icons/ai";
import { PiSignIn } from "react-icons/pi";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiMap } from "react-icons/ci";
import { CgMenuGridO } from "react-icons/cg";
import { AiOutlineUnorderedList } from "react-icons/ai";

// Components
import ScheduleMobile from "../common/ScheduleMobile";
import Sidebar from "../common/Sidebar";

const NavbarMobile = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isMapView,
    setMapView,
    userInfo,
    showScheduleBar,
    setShowScheduleBar,
    setSidebarMenuOpen,
    sidebarMenuOpen,
  } = userAppStore();

  return (
    <div className="fixed bottom-2 left-4 rounded-full w-[90%] bg-white opacity-80 backdrop-filter backdrop-blur-md z-50 shadow-xl border border-[#9095a086]">
      {!userInfo ? (
        <ul className="flex justify-evenly gap-3">
          <li className="px-2 py-1 flex flex-col gap-1 justify-center items-center font-bold">
            <button onClick={setShowScheduleBar}>
              <AiOutlineSearch size={20} color="#58418b" />
            </button>
            <span className="text-[10px] text-[#58418b]">Explore</span>
          </li>
          <li className="px-2 py-1 flex flex-col gap-1 justify-center items-center font-bold">
            <button onClick={() => router.push("auth/signup")}>
              <AiOutlineUserAdd size={20} color="#58418b" />
            </button>
            <span className="text-[10px] text-[#58418b]">Sign-Up</span>
          </li>
          <li className="px-2 py-1 flex flex-col gap-1 justify-center items-center font-bold">
            <button onClick={() => router.push("auth/signin")}>
              <PiSignIn size={20} color="#58418b" />
            </button>
            <span className="text-[10px] text-[#58418b]">Sign-In</span>
          </li>
        </ul>
      ) : (
        <ul className="flex justify-evenly items-center gap-1">
          <li
            className={`px-1 py-1 flex flex-col gap-1 justify-center items-center font-bold`}
          >
            <button onClick={() => router.push("/")}>
              <AiOutlineHome
                size={20}
                color={pathname !== "/" ? "#58418b" : "#000033"}
              />
            </button>
            <span
              className={`text-[10px]  ${
                pathname !== "/" ? "text-[#58418b]" : "#000033"
              }`}
            >
              Home
            </span>
          </li>
          <li className="px-1 py-1 flex flex-col gap-1 justify-center items-center font-bold">
            <button onClick={() => router.push("/wishlist")}>
              <AiOutlineHeart
                size={20}
                color={pathname !== "/wishlist" ? "#58418b" : "#000033"}
              />
            </button>
            <span
              className={`text-[10px] ${
                pathname !== "/wishlist" ? "text-[#58418b]" : "#000033"
              }`}
            >
              Wishlist
            </span>
          </li>
          {userInfo.roles[0] === "owner" && (
            <li className="px-1 py-1 flex flex-col gap-1 justify-center items-center font-bold">
              <button onClick={() => router.push("new-listing")}>
                <IoAddCircleOutline size={20} color={"#58418b"} />
              </button>
              <span className="text-[10px] text-[#58418b]">Add Hall</span>
            </li>
          )}
          <li className="px-1 py-1 flex flex-col gap-1 justify-center items-center font-extrabold">
            <button onClick={() => setMapView()}>
              {!isMapView ? (
                <CiMap size={20} color={"#58418b"} />
              ) : (
                <AiOutlineUnorderedList size={20} color={"#58418b"} />
              )}
            </button>
            <span className={`text-[10px]  text-[#58418b]`}>
              {!isMapView ? "Show Map" : "Show List"}
            </span>
          </li>
          <li className="px-1 py-1 flex flex-col gap-1 justify-center items-center font-extrabold">
            <button onClick={() => setSidebarMenuOpen(true)}>
              <CgMenuGridO size={20} color={"#58418b"} />
            </button>
            <span className={`text-[10px]  text-[#58418b]`}>Menu</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavbarMobile;
