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
import Card from "./components/Card";
import Chart from "./components/Chart";

// Icons
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";

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
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [isClient, setIsClient] = useState(false);

  // Prevent Hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  return (
    <>
      {!isClient ? (
        <Spinner />
      ) : (
        <div>
          <Navbar />
          <div className="px-4 mb-6 mt-6 flex flex-col space-y-5">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2  xl:grid-cols-4">
              <Card
                title="Owners"
                titleLink="users"
                color="#e2a03f"
                icon={<RiAdminFill size={35} color="#e2a03f" />}
              />
              <Card
                title="Clients"
                titleLink="users"
                color="#00ab55"
                icon={<FaUsers size={35} color="#00ab55" />}
              />
              <Card
                title="Halls"
                titleLink="listings"
                color="#e7515a"
                icon={<BsFillBuildingsFill size={35} color="#e7515a" />}
              />
              <Card
                title="Reservations"
                titleLink="trips"
                color="#2196f3"
                icon={<FaCalendarAlt size={35} color="#2196f3" />}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <Chart
                title="Clients"
                color="#00ab55"
                borderColor="#ddf5f0"
                titleLink="users"
              />
              <Chart
                title="Halls"
                color="#e7515a"
                borderColor="#fff5f5"
                titleLink="listings"
              />
            </div>
          </div>
          <CompactFooter />
          {!isDesktop && <NavbarMobile />}
        </div>
      )}
    </>
  );
};

export default page;
