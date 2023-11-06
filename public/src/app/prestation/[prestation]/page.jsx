"use client";
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});

import { userAppStore } from "airbnb/store/store";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import { getListing } from "airbnb/lib/lisitng";

const page = ({ params: { prestation } }) => {
  const { isAuthModalOpen, currentListing, setCurrentListing } = userAppStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const getData = async () => {
      const data = await getListing(prestation);
      setCurrentListing(data);
      console.log("current listing data: ", data);
    };
    if (prestation) getData();
    console.log("listing: ", prestation);
  }, [prestation, setCurrentListing]);

  return (
    <div>
      <div>test</div>
    </div>
  );
};

export default page;
