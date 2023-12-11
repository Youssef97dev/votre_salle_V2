"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AirBnbLogo from "airbnb/svg/airbnb-logo";
import Image from "next/image";
import { userAppStore } from "airbnb/store/store";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import { IoClose } from "react-icons/io5";
import { FaInstagram , FaFacebook, FaYoutube  } from "react-icons/fa";
import ContextMenu from "../common/ContextMenu";


import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();
  const { userInfo, setUserInfo, sidebarMenuOpen, setSidebarMenuOpen } = userAppStore();
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
      name: "Login",
      callBack: () => {
        router.push("/auth/signin");
        setSidebarMenuOpen(false);
      },
    },
    {
      name: "Signup",
      callBack: () => {
        router.push("/auth/signup");
        setSidebarMenuOpen(false);
      },
    },
    {
      name: "Add Your Hall",
      callBack: () => {
        setSidebarMenuOpen(false);
      },
    },
    {
      name: "Help",
      callBack: () => {
        setSidebarMenuOpen(false);
      },
    },
  ];

  const authenticatedContextMenuOptions = [
    {
      name: "Profile",
      callBack: () => {
        router.push("/profile");
        setSidebarMenuOpen(false);
      },
    },
    {
      name: "Notifications",
      callBack: () => {
        setSidebarMenuOpen(false);
      },
    },
    {
      name: "My Reservations",
      callBack: () => {
        router.push("/trips");
        setSidebarMenuOpen(false);
      },
    },
    {
      name: "My Wishlists",
      callBack: () => {
        router.push("/wishlist");
        setSidebarMenuOpen(false);
      },
    },
    {
      name: "Manage My Listings",
      callBack: () => {
        router.push("/my-listings");
        setSidebarMenuOpen(false);
      },
    },
    {
      name: "Manage My Reservations",
      callBack: () => {
        router.push("/my-reservations");
        setSidebarMenuOpen(false);
      },
    },
    {
      name: "Add Your Hall",
      callBack: () => {
        router.push("new-listing");
        setSidebarMenuOpen(false);
      },
    },
    {
      name: "Calendar",
      callBack: () => {
        router.push("/calendar");
        setSidebarMenuOpen(false);
      },
    },
    {
      name: "Statistics",
      callBack: () => {
        router.push("/statistics");
        setSidebarMenuOpen(false);
      },
    },
    {
      name: "Invoices",
      callBack: () => {
        router.push("/invoices");
        setSidebarMenuOpen(false);
      },
    },
    {
      name: "Logout",
      callBack: () => {
        setSidebarMenuOpen(false);
        setUserInfo(null);
        localStorage.clear();
      },
    },
  ];

  return (
    <div
      ref={sidebarMenuRef}
      className={`shadow-2xl text-neutral-700 border border-gray-200 flex flex-col gap-7 top-0 right-0 w-full sm:w-[28vw] bg-white py-2 px-3 fixed h-full z-50 animate__animated animate__faster ${
        sidebarMenuOpen ? "animate__fadeInRight" : "animate__fadeOutLeft"
      }`}
    >
      <div className="flex justify-between items-center ">
        <AirBnbLogo />
        <IoClose size={25} onClick={()=> setSidebarMenuOpen(false)} className="cursor-pointer" />
      </div>
      <div className="font-medium">
        Discover the most outstanding articles on all topics of life. Write your stories and share them
      </div>
      <div className="flex space-x-4 items-center">
      <Link
            href="#"
            className="font-bold hover:text-pink-500"
          >
            <FaInstagram size={18} />
          </Link>
          <Link
            href="#"
            className="font-bold hover:text-blue-800"
          >
            <FaFacebook size={18} />
          </Link>
          <Link
            href="#"
            className="font-bold hover:text-red-500"
          >
            <FaYoutube size={18} />
          </Link>
      </div>
      <div className="flex flex-col gap-2">
      <ContextMenu
            options={
              !userInfo ? contextMenuOptions : authenticatedContextMenuOptions
            }
            userInfo={userInfo}
          />
      </div>
      
    </div>
  );
};

export default Sidebar;
