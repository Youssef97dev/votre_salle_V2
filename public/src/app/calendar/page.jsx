"use client";
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});

import { userAppStore } from "airbnb/store/store";
import React, { useEffect, useState, Fragment } from "react";
import { getUserReservedTrips, getUserListings } from "airbnb/lib/lisitng";
import dynamic from "next/dynamic";

import { Tab } from "@headlessui/react";
import BigCalendar from "./components/BigCalendar";

const page = () => {
  const {
    isAuthModalOpen,
    userInfo,
    setUserListings,
    userListings,
    relaunchData,
    reservations,
    setReservations,
  } = userAppStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserListings(userInfo?.id);
      const reservations = await getUserReservedTrips(userInfo?.id);
      setUserListings(data);
      setReservations(reservations);
      console.log(data);
    };
    if (userInfo) {
      getData();
    }
  }, [userInfo, setUserListings, relaunchData]);

  return (
    isClient && (
      <>
        {/* Header */}
        <Navbar />

        {/* Content */}
        <div className="mb-5 p-3">
          <Tab.Group>
            <div className="mx-10 mb-5 sm:mb-0 flex flex-col gap-4">
              <Tab.List className="flex w-full flex-row justify-end items-center gap-3">
                {userListings.map((listing, index) => (
                  <Tab as={Fragment} key={index}>
                    {({ selected }) => (
                      <div className="text-center !outline-none border border-blue-950 rounded-lg">
                        <button
                          className={`${
                            selected
                              ? "!bg-blue-950 text-white !outline-none"
                              : ""
                          } block rounded-lg p-3.5 py-2 transition-all duration-300 hover:bg-blue-950 hover:text-white w-full text-left`}
                        >
                          {listing.title}
                        </button>
                      </div>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="w-full">
                {userListings.map((listing, index) => (
                  <Tab.Panel key={index}>
                    <div className="active">
                      <BigCalendar listing={listing} />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>

        {/* Footer */}
        <CompactFooter />

        {!isDesktop && <NavbarMobile />}
      </>
    )
  );
};

export default page;
