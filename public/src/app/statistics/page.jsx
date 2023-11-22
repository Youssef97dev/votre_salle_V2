"use client";
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});
import { userAppStore } from "airbnb/store/store";
import React, { useEffect, useState, Fragment } from "react";
import { getUserReservedTrips, getUserListings } from "airbnb/lib/lisitng";
import { Tab } from "@headlessui/react";

// Components
import Charts from "./components/Charts";

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
          setUserListings(data);
          console.log(data);
        };
        if (userInfo) {
          getData();
        }
      }, [userInfo, setUserListings, relaunchData]);

  return isClient && (
    <>
    {/* Header */}
    <Navbar />

    {/* Content */}
    <div className="mb-5 p-3">
          <Tab.Group>
            <div className="mx-2 md:mx-10 lg:mx-20 mb-5 sm:mb-0 flex flex-col gap-4">
              <Tab.List className="my-3 flex flex-wrap">
                {userListings.map((listing, index) => (
                  <Tab as={Fragment} key={index}>
                    {({ selected }) => (
                        <button
                          className={`${selected ? 'text-[#805DCA] !outline-none before:!w-full' : ''} w-full xs:w-auto justify-center relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-[#805DCA] before:transition-all before:duration-700 hover:text-[#805DCA] hover:before:w-full`}
                        >
                          {listing.title}
                        </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="w-full">
                {userListings.map((listing, index) => (
                  <Tab.Panel key={index}>
                    <div className="active">
                      <Charts listing={listing} />
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
}

export default page