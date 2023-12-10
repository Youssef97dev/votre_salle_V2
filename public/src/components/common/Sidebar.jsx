import React, { useState, useEffect, useRef } from "react";
import AirBnbLogo from "airbnb/svg/airbnb-logo";
import Image from "next/image";
import { userAppStore } from "airbnb/store/store";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";

const Sidebar = () => {
  const { userInfo, sidebarMenuOpen, setSidebarMenuOpen } = userAppStore();
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
  return (
    <div
      ref={sidebarMenuRef}
      className={`top-0 right-0 w-[28vw] bg-blue-600  p-10 pl-20 text-white fixed h-full z-50 animate__animated animate__faster ${
        sidebarMenuOpen ? "animate__fadeInRight" : "animate__fadeOutLeft"
      }`}
    >
      <h2 className="mt-20 text-4xl font-semibold text-white">
        I am a sidebar
      </h2>
    </div>
  );
};

export default Sidebar;
