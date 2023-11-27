"use client";
import AirBnbLogo from "airbnb/svg/airbnb-logo";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FiGlobe } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import ScheduleBar from "../common/ScheduleBar";
import ContextMenu from "../common/ContextMenu";
import { userAppStore } from "airbnb/store/store";
import { useRouter } from "next/navigation";
import Schedule from "../common/Schedule";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import ScheduleMobile from "../common/ScheduleMobile";

function Navbar() {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const {
    setAuthModal,
    userInfo,
    setUserInfo,
    setMapView,
    setInitialView,
    showScheduleBar,
    setShowScheduleBar,
  } = userAppStore();
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const contextMenuOptions = [
    {
      name: "Login",
      callBack: () => {
        setAuthModal();
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Signup",
      callBack: () => {
        setAuthModal();
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Add Your Hall",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Help",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
  ];

  const authenticatedContextMenuOptions = [
    {
      name: "Profile",
      callBack: () => {
        router.push("/profile");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Notifications",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "My Reservations",
      callBack: () => {
        router.push("/trips");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "My Wishlists",
      callBack: () => {
        router.push("/wishlist");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Manage My Listings",
      callBack: () => {
        router.push("/my-listings");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Manage My Reservations",
      callBack: () => {
        router.push("/my-reservations");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Add Your Hall",
      callBack: () => {
        router.push("new-listing");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Calendar",
      callBack: () => {
        router.push("/calendar");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Statistics",
      callBack: () => {
        router.push("/statistics");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Logout",
      callBack: () => {
        setIsContextMenuVisible(false);
        setUserInfo(null);
        localStorage.clear();
      },
    },
  ];

  const showContextMenu = (e) => {
    e.preventDefault();
    setIsContextMenuVisible(true);
  };

  useEffect(() => {
    console.log("user :", userInfo);
  }, []);

  return (
    <header
      className={`w-full flex flex-col justify-center transition-all duration-300
    ${
      !showScheduleBar || !isDesktop
        ? "h-20 border-b border-b-gray-200"
        : "shadow-2xl h-40"
    }
    `}
    >
      <div className="flex  items-center  justify-between px-2 lg:px-20 ">
        <div className="flex-grow basis-0 ">
          <div
            className="w-max cursor-pointer"
            onClick={() => {
              router.push("/");
              setInitialView();
            }}
          >
            <AirBnbLogo />
          </div>
        </div>
        <div>{(!showScheduleBar || !isDesktop) && <ScheduleBar />}</div>
        <div className="flex-grow basis-0 ">
          <ul className="flex items-center justify-end gap-6 font-medium">
            {userInfo && (
              <li className="cursor-pointer hidden md:block">
                <span>
                  {userInfo.firstName} {userInfo.lastName}
                </span>
              </li>
            )}
            <li className="cursor-pointer hidden md:block">
              <FiGlobe />
            </li>
            <li
              className="flex cursor-pointer items-center gap-2 border border-gray-300 py-2 px-3 rounded-full hover:shadow-xl transition-all duration-500"
              onClick={(e) => showContextMenu(e)}
            >
              <RxHamburgerMenu className="text-lg" />
              <span>
                {userInfo ? (
                  <span className="flex justify-center items-center bg-black text-white h-7 w-7 text-sm rounded-full">
                    {userInfo?.firstName?.split("").shift()?.toUpperCase()}
                  </span>
                ) : (
                  <Image
                    src="/empty-profile.png"
                    alt="profile"
                    height={30}
                    width={30}
                  />
                )}
              </span>
            </li>
          </ul>
        </div>
        {isContextMenuVisible && (
          <ContextMenu
            options={
              !userInfo ? contextMenuOptions : authenticatedContextMenuOptions
            }
            cordinates={{
              x: window.innerWidth - 250,
              y: 70,
            }}
            contextMenu={isContextMenuVisible}
            setContextMenu={setIsContextMenuVisible}
            userInfo={userInfo}
          />
        )}
      </div>
      {showScheduleBar && isDesktop && (
        <div className="flex justify-center">
          <Schedule />
        </div>
      )}
      {showScheduleBar && !isDesktop && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
          <ScheduleMobile />
        </div>
      )}
    </header>
  );
}

export default Navbar;
