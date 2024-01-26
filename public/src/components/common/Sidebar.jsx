"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { userAppStore } from "airbnb/store/store";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import { IoClose } from "react-icons/io5";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import ContextMenu from "../common/ContextMenu";

// Icons
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline, IoMdAdd } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { FaRegHeart, FaRegCalendarAlt, FaChartBar } from "react-icons/fa";
import { MdLogout, MdOutlineSettings, MdHelpOutline } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { PiSignInBold } from "react-icons/pi";
import { SiGnuprivacyguard } from "react-icons/si";

import Link from "next/link";

import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { userInfo, setUserInfo, sidebarMenuOpen, setSidebarMenuOpen } =
    userAppStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const sidebarMenuRef = useRef(null); // Create a ref for the context menu element

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "context-opener") {
        if (
          sidebarMenuRef.current && // Check if the context menu ref exists
          !sidebarMenuRef.current.contains(event.target) // Check if the click is outside of the context menu
        ) {
          setSidebarMenuOpen(false); // Close the context menu
        }
      }
    };

    document.addEventListener("click", handleOutsideClick); // Add the event listener

    return () => {
      document.removeEventListener("click", handleOutsideClick); // Clean up the event listener on component unmount
    };
  }, []);

  const contextMenuOptions = [
    {
      icon: <PiSignInBold />,
      name: `${t("navigation.signin")}`,
      callBack: () => {
        router.push("/auth/signin");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <SiGnuprivacyguard />,
      name: `${t("navigation.signup")}`,
      callBack: () => {
        router.push("/auth/signup");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <IoMdAdd />,
      name: "Add Your Hall",
      callBack: () => {
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <MdHelpOutline />,
      name: `${t("navigation.help")}`,
      callBack: () => {
        setSidebarMenuOpen(false);
      },
    },
  ];

  const authenticatedContextMenuOptions = [
    {
      icon: <CgProfile />,
      name: "Profile",
      callBack: () => {
        router.push("/profile");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <IoMdNotificationsOutline />,
      name: "Notifications",
      callBack: () => {
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <FaListCheck />,
      name: `${t("navigation.my_bookings")}`,
      callBack: () => {
        router.push("/trips");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <FaRegHeart />,
      name: `${t("navigation.my_wishlists")}`,
      callBack: () => {
        router.push("/wishlist");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <MdOutlineSettings />,
      name: `${t("navigation.my_listings")}`,
      callBack: () => {
        router.push("/my-listings");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <MdOutlineSettings />,
      name: `${t("navigation.bookings_received")}`,
      callBack: () => {
        router.push("/my-reservations");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <IoMdAdd />,
      name: `${t("navigation.add_hall")}`,
      callBack: () => {
        router.push("new-listing");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <FaRegCalendarAlt />,
      name: `${t("navigation.calendar")}`,
      callBack: () => {
        router.push("/calendar");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <FaChartBar />,
      name: `${t("navigation.statistics")}`,
      callBack: () => {
        router.push("/statistics");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <LiaFileInvoiceDollarSolid />,
      name: `${t("navigation.invoices")}`,
      callBack: () => {
        router.push("/invoices");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <MdLogout />,
      name: `${t("navigation.logout")}`,
      callBack: () => {
        setSidebarMenuOpen(false);
        setUserInfo(null);
        localStorage.clear();
      },
    },
  ];

  const adminContextMenuOptions = [
    {
      icon: <CgProfile />,
      name: "Dashboard",
      callBack: () => {
        router.push("/admin");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <CgProfile />,
      name: "Owners",
      callBack: () => {
        router.push("/admin/owners");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <CgProfile />,
      name: "Users",
      callBack: () => {
        router.push("/admin/users");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <IoMdNotificationsOutline />,
      name: "Reservations",
      callBack: () => {
        router.push("/admin/reservations");
        setSidebarMenuOpen(false);
      },
    },
    {
      icon: <MdLogout />,
      name: "Logout",
      callBack: () => {
        setSidebarMenuOpen(false);
        setUserInfo(null);
        localStorage.clear();
        router.push("/auth/signin");
      },
    },
  ];

  return (
    <div
      ref={sidebarMenuRef}
      className={`shadow-2xl text-neutral-700 border border-gray-200 flex flex-col space-y-2 lg:space-y-6 top-0 right-0 w-full sm:w-[50vw] lg:w-[20vw] bg-white py-2 fixed h-full z-[60] animate__animated animate__faster ${
        sidebarMenuOpen ? "animate__fadeInRight" : "animate__fadeOutLeft"
      }`}
    >
      <div className="flex justify-end items-center ">
        <IoClose
          size={25}
          onClick={() => setSidebarMenuOpen(false)}
          className="cursor-pointer"
        />
      </div>
      {userInfo && (
        <div className="flex gap-1 items-center bg-[#e7f7ff] p-1">
          <div className="">
            {userInfo?.profileImage ? (
              <img
                className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-black overflow-hidden object-cover"
                src={`${process.env.NEXT_PUBLIC_API_FRONT_URI}/uploads/${userInfo?.profileImage}`}
                alt="img"
              />
            ) : (
              <span className="flex justify-center items-center bg-black text-white w-14 h-14 md:w-20 md:h-20 text-xl md:text-4xl rounded-full">
                {userInfo?.firstName?.split("").shift()?.toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex flex-col font-bold text-xs md:text-sm">
            <span>
              {userInfo?.firstName} {userInfo?.lastName}
            </span>
            <span className="text-gray-500">{userInfo?.username}</span>
            <span className="mt-2 text-[#3b3f5c]">
              {userInfo?.typeUser}
              {" | "}
              {userInfo?.roles[0]}
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 px-2">
        <ContextMenu
          options={
            !userInfo
              ? contextMenuOptions
              : userInfo.roles[0] === "admin"
              ? adminContextMenuOptions
              : authenticatedContextMenuOptions
          }
          userInfo={userInfo}
        />
      </div>
      <div className="flex space-x-4 items-center p-2">
        <Link href="#" className="font-bold hover:text-pink-500">
          <FaInstagram size={isDesktop ? 18 : 14} />
        </Link>
        <Link href="#" className="font-bold hover:text-blue-800">
          <FaFacebook size={isDesktop ? 18 : 14} />
        </Link>
        <Link href="#" className="font-bold hover:text-red-500">
          <FaYoutube size={isDesktop ? 18 : 14} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
