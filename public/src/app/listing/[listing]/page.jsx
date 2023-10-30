"use client";
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});

import { userAppStore } from "airbnb/store/store";
import React, { useEffect, useState, useRef } from "react";
import ListingPhotos from "./components/ListingPhotos";
import TripScheduler from "./components/TripScheduler";
import ListingAmenties from "./components/ListingAmenties";
import ListingMap from "./components/ListingMap";
import { getListing } from "airbnb/lib/lisitng";
import dynamic from "next/dynamic";

import { useMediaQuery } from "airbnb/hooks/useMediaQuery";

export default function Page({ params: { listing } }) {
  const { isAuthModalOpen, currentListing, setCurrentListing } = userAppStore();
  const [showReservePopup, setShowReservePopup] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const fixedRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await getListing(listing);
      setCurrentListing(data);
    };
    if (listing) getData();
  }, [listing, setCurrentListing]);
  return (
    <div>
      {currentListing && (
        <div className="">
          <Navbar />
          <div className=" px-5 md:px-20 pt-10 text-airbnb-light-black grid gap-10" >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl md:text-5xl">{currentListing?.title}</h2>
                <span className="text-sm md:text-lg cursor-pointer underline">
                  {currentListing?.locationData?.landmark}
                </span>
              </div>
              <ListingPhotos />

              <div className="grid gap-5" style={{ gridTemplateColumns: isDesktop && "70fr 30fr" }}>
              <div className="flex flex-col gap-5" >
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm md:text-2xl font-semibold">
                    {currentListing?.locationType} hosted by{" "}
                    {currentListing?.listingCreatedBy?.firstName}{" "}
                    {currentListing?.listingCreatedBy?.lastName}
                  </h3>
                  <ul className="flex gap-5 flex-col md:flex-row">
                    {Object.keys(currentListing.placeSpace).map((type) => (
                      <li
                        className="border border-gray-300 p-3 rounded-lg flex flex-row md:flex-col justify-start items-center gap-3 md:gap-0 md:items-start w-full md:w-32"
                        key={type}
                      >
                        <span className="text-xs md:text-2xl font-semibold">
                          {currentListing.placeSpace[type]}
                        </span>
                        <span className="capitalize text-sm md:text-base">{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-medium md:font-semibold text-sm md:text-base">{currentListing?.description}</p>
                <ListingAmenties />
                <ListingMap />
              </div>
              {isDesktop && <div>
                <TripScheduler />
              </div>}
              </div>
            </div>
            {!isDesktop && <div ref={fixedRef} className={`fixed z-10 flex flex-row font-medium text-white shadow-2xl px-1 py-2 bg-white gap-2 justify-between items-center bottom-0 left-0 border border-[#d3d3d3] rounded-lg w-full h-16 transition-transform transform duration-300 ${!isSticky ? '-translate-y-0' : 'translate-y-16'}`}>
              <span className="w-full font-medium text-sm text-[#000]">
                Ajouter des dates pour voir les prix
              </span>
              <button onClick={() => setShowReservePopup(true)}  className="w-full rounded-xl py-2 bg-sky-900">
                Reserve
              </button>
            </div>}
          </div>
          {showReservePopup && !isDesktop && (
        <div className="fixed inset-0 flex items-end lg:items-center justify-center bg-gray-900 bg-opacity-80 z-50">
          
            <div className={`relative w-full h-[98%]  rounded-t-xl bg-white p-2 overflow-hidden  ${showReservePopup ? 'transform translate-y-0 transition-transform duration-3000' : ''}`}>
            
                <div className="w-full h-full overflow-auto  mt-8 pb-8">
                  <TripScheduler />
                </div>
              <button className="absolute top-4 left-6 text-black font-semibold cursor-pointer" onClick={() => setShowReservePopup(false)}>
                  X
              </button>
            </div>
          
        </div>
      )}
          {/*<CompactFooter />*/}
          {isAuthModalOpen && <AuthModal />}
        </div>
      )}
    </div>
  );
}
