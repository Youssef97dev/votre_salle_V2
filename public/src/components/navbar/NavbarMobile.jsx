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

import { useTranslation } from "react-i18next";

// Components
import ScheduleMobile from "../common/ScheduleMobile";
import Sidebar from "../common/Sidebar";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const NavbarMobile = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const MySwal = withReactContent(Swal);
  const {
    isMapView,
    setMapView,
    userInfo,
    showScheduleBar,
    setShowScheduleBar,
    setSidebarMenuOpen,
    sidebarMenuOpen,
  } = userAppStore();

  const goToNewlisting = () => {
    if (userInfo?.listings?.length < userInfo?.pack) {
      router.push("new-listing");
    } else {
      MySwal.fire({
        title: `Upgrade your plan please, you have ${userInfo?.pack} halls to publish`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        background: "#3b3f5c",
        color: "#fff",
      });
    }
  };

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
            <span className="text-[10px] text-[#58418b]">
              {t("navigation.signup")}
            </span>
          </li>
          <li className="px-2 py-1 flex flex-col gap-1 justify-center items-center font-bold">
            <button onClick={() => router.push("auth/signin")}>
              <PiSignIn size={20} color="#58418b" />
            </button>
            <span className="text-[10px] text-[#58418b]">
              {t("navigation.signin")}
            </span>
          </li>
        </ul>
      ) : (
        <ul className="flex justify-evenly items-center gap-1 p-2">
          <li
            className={`px-1 py-1 flex flex-col gap-1 justify-center items-center font-bold`}
          >
            <button onClick={() => router.push("/")}>
              <AiOutlineHome
                size={23}
                color={pathname !== "/" ? "#58418b" : "#000033"}
              />
            </button>
            {/*<span
              className={`text-[10px]  ${
                pathname !== "/" ? "text-[#58418b]" : "#000033"
              }`}
            >
              {t("navigation.home")}
            </span>*/}
          </li>
          <li className="px-1 py-1 flex flex-col gap-1 justify-center items-center font-bold">
            <button onClick={() => router.push("/wishlist")}>
              <AiOutlineHeart
                size={23}
                color={pathname !== "/wishlist" ? "#58418b" : "#000033"}
              />
            </button>
            {/*<span
              className={`text-[10px] ${
                pathname !== "/wishlist" ? "text-[#58418b]" : "#000033"
              }`}
            >
              {t("navigation.my_wishlists")}
            </span>*/}
          </li>
          {userInfo.roles[0] === "owner" && (
            <li className="px-1 py-1 flex flex-col gap-1 justify-center items-center font-bold">
              <button onClick={() => goToNewlisting()}>
                <IoAddCircleOutline size={23} color={"#58418b"} />
              </button>
              {/*<span className="text-[10px] text-[#58418b]">
                {t("navigation.add_hall")}
          </span>*/}
            </li>
          )}
          <li className="px-1 py-1 flex flex-col gap-1 justify-center items-center font-extrabold">
            <button onClick={() => setMapView()}>
              {!isMapView ? (
                <CiMap size={23} color={"#58418b"} />
              ) : (
                <AiOutlineUnorderedList size={23} color={"#58418b"} />
              )}
            </button>
            {/*<span className={`text-[10px]  text-[#58418b]`}>
              {!isMapView
                ? `${t("button.show_map")}`
                : `${t("button.show_list")}`}
              </span>*/}
          </li>
          <li className="px-1 py-1 flex flex-col gap-1 justify-center items-center font-extrabold">
            <button onClick={() => setSidebarMenuOpen(true)}>
              <CgMenuGridO size={23} color={"#58418b"} />
            </button>
            {/*<span className={`text-[10px]  text-[#58418b]`}>Menu</span>*/}
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavbarMobile;
