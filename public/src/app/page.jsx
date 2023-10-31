"use client";
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
import ListingCard from "airbnb/components/listingCard";
import Spinner from "airbnb/components/common/Spinner";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});

import ListView from "airbnb/components/views/ListView";
import MapView from "airbnb/components/views/MapView";
import ViewSwitchBadge from "airbnb/components/views/ViewSwitchBadge";
import { listingTypes } from "airbnb/data/listingTypes";
import Dammuso from "airbnb/svg/lisitngTypes/dammuso";
import { me } from "airbnb/lib/auth";
import { getAllListings, getUserWishlists } from "airbnb/lib/lisitng";
import { userAppStore } from "airbnb/store/store";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";


export default function Home() {
  const [locationType, setLocationType] = useState("All");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const {
    isAuthModalOpen,
    setUserInfo,
    listings,
    setListings,
    isMapView,
    userInfo,
    wishLists,
    setWishLists,
  } = userAppStore();
  useEffect(() => {
    const getUser = async () => {
      setLoadingUser(true);
      const data = await me();
      setUserInfo(data);
      setLoadingUser(false);
    };
    getUser();
    
  }, [setUserInfo]);

  useEffect(() => {
    const getData = async () => {
      setLoadingData(true);
      const data = await getAllListings(locationType);
      setListings(data);
      const wishlists = await getUserWishlists(userInfo?.id);
      const wishListsId = wishlists?.map(({ listing }) => listing.id);
      setWishLists(wishListsId);
      setLoadingData(false);
    };
    getData();
  }, [setListings, setWishLists, userInfo?.id, locationType]);

  return (
    <>
    {loadingUser || loadingData ? (
      <Spinner/>
    ) : (
      <div className="max-h-[100vh] h-[100vh]">
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="w-[90vw] overflow-auto no-scrollbar mt-3 px-5">
          <ul className="flex gap-5 h-full justify-between">
            <li
              onClick={() => setLocationType("All")}
              className="w-max flex flex-col items-center justify-between h-16 cursor-pointer hover:text-[#3232FF] text-[#000033]"
            >
              <span className="h-10 w-10  flex items-center justify-center ">
                <Dammuso />
              </span>
              <div
                className="text-xs font-semibold break-keep"
                style={{ width: "inherit" }}
              >
                All
              </div>
            </li>
            {listingTypes.map((data) => (
              <li
                key={data.name}
                onClick={() => setLocationType(data.name)}
                className="w-max flex flex-col items-center justify-between h-16 cursor-pointer hover:text-[#3232FF] text-[#000033]"
              >
                <span className="h-10 w-10  flex items-center justify-center ">
                  {data.svgPath}
                </span>
                <div
                  className="text-xs font-semibold break-keep"
                  style={{ width: "inherit" }}
                >
                  {data.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isMapView ? <MapView /> : <ListView />}
      <ViewSwitchBadge />
      <CompactFooter />
      {!isDesktop && <NavbarMobile />}
      {isAuthModalOpen && <AuthModal />}
    </div>
    )}
    </>
  );
}
