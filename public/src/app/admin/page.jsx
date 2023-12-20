"use client";

// Libs
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Components
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
import Spinner from "airbnb/components/common/Spinner";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});

// Hooks
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";

// APIs
import {
  getInvoicesByUser,
  changeInvoiceStatus,
  downloadInvoice,
} from "airbnb/lib/lisitng";

// Store
import { userAppStore } from "airbnb/store/store";

const page = () => {
  const router = useRouter();
  const { userInfo } = userAppStore();

  // protect admin page
  useEffect(() => {
    // Check if user is authenticated
    if (!userInfo) {
      router.push("/login");
    }
    // Check if user is admin
    if (userInfo.roles[0] !== "admin") {
      router.push("/");
    }
  }, [userInfo, router]);

  return <div>admin</div>;
};

export default page;
