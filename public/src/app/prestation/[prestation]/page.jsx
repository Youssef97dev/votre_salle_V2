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
};

export default page;
