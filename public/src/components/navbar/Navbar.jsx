"use client";
import AirBnbLogo from "airbnb/svg/airbnb-logo";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getImage } from "airbnb/lib/lisitng";
import { FiGlobe } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa6";
import ScheduleBar from "../common/ScheduleBar";
import ContextMenu from "../common/ContextMenu";
import { userAppStore } from "airbnb/store/store";
import { useRouter } from "next/navigation";
import Schedule from "../common/Schedule";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import ScheduleMobile from "../common/ScheduleMobile";
import Sidebar from "../common/Sidebar";
import Dropdown from "airbnb/hooks/Dropdown";
import Notifications from "../modals/Notifications";

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
    setSidebarMenuOpen,
    sidebarMenuOpen,
  } = userAppStore();
  const [imageProfile, setImageProfile] = useState("");
  const [notif, setNotif] = useState(false);

  const showContextMenu = (e) => {
    e.preventDefault();
    setSidebarMenuOpen(true);
  };

  useEffect(() => {
    console.log("user :", userInfo);
    const getProfileImage = async () => {
      const image = await getImage(userInfo?.profileImage);
      setImageProfile(image);
    };
    if (userInfo) {
      getProfileImage();
    }
  }, [userInfo, setUserInfo]);

  useEffect(() => {
    if (userInfo) {
      const result = userInfo?.notifications?.some(
        (notification) => notification.read === false
      );
      setNotif(result);
    }
  }, [userInfo, setUserInfo]);

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
        <div className="md:flex-grow md:basis-0 hidden md:block">
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
        <div className={!isDesktop && "w-full"}>
          {(!showScheduleBar || !isDesktop) && <ScheduleBar />}
        </div>
        <div className="md:flex-grow md:basis-0 hidden md:block">
          <ul className="flex items-center justify-end gap-6 font-medium">
            <li className="cursor-pointer">
              <FiGlobe />
            </li>
            {userInfo && (
              <li className="relative cursor-pointer">
                <div className="dropdown">
                  <Dropdown
                    placement={"bottom-end"}
                    button={
                      <>
                        <IoNotificationsOutline size={25} />
                        {notif && (
                          <span className="absolute -top-0.5 -right-0.5 font-bold">
                            <FaCircle color="#4361ee" size={8} />
                          </span>
                        )}
                      </>
                    }
                  >
                    <ul className="!min-w-[400px] space-y-3">
                      <li className="font-bold text-xl p-1">Notifications</li>
                      {userInfo?.notifications?.map((notification, index) => (
                        <li key={index}>
                          <Notifications notification={notification} />
                        </li>
                      ))}
                    </ul>
                  </Dropdown>
                </div>
              </li>
            )}
            <li
              className="flex cursor-pointer items-center gap-2 border border-gray-300 py-2 px-3 rounded-full hover:shadow-xl transition-all duration-500"
              onClick={(e) => showContextMenu(e)}
            >
              <RxHamburgerMenu className="text-lg" />
              <span>
                {userInfo ? (
                  <>
                    {userInfo?.profileImage && imageProfile ? (
                      <img
                        className="w-7 h-7 rounded-full overflow-hidden object-cover"
                        src={`data:image/*;base64,${imageProfile}`}
                        alt="img"
                      />
                    ) : (
                      <span className="flex justify-center items-center bg-black text-white h-7 w-7 text-sm rounded-full">
                        {userInfo?.firstName?.split("").shift()?.toUpperCase()}
                      </span>
                    )}
                  </>
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
        {sidebarMenuOpen && (
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
            <Sidebar />
          </>
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
