"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});
const NavbarMobile = dynamic(() => import("airbnb/components/navbar/NavbarMobile"), {
    ssr: false,
  });

import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import { getAllListings, getUserWishlists } from "airbnb/lib/lisitng";
import { userAppStore } from "airbnb/store/store";

// Components
import InfoProfile from "./components/InfoProfile";
import DetailProfile from "./components/DetailProfile";



const page = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
      }, []);

  return isClient && (
    <div className="max-h-[100vh] h-[100vh]" >
        <Navbar />
        <div className="flex gap-5 px-44 py-10 w-full h-full ">
            <div className="flex-1" style={{flexBasis:"30%"}}>
                <InfoProfile />
            </div>
            <div className="flex-1 shadow-lg shadow-neutral-400 rounded-xl p-2" style={{flexBasis:"70%"}}>
                <DetailProfile />
            </div>
        </div>
        <CompactFooter />
    </div>
  )
}

export default page