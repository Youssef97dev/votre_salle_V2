"use client";
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
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
import { Navigation } from "swiper/modules";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";

import { IoFilterOutline } from "react-icons/io5";
import Filter from "airbnb/components/modals/Filter";

export default function Home() {
  const [locationType, setLocationType] = useState("All");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [showFilter, setShowFilter] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const {
    isAuthModalOpen,
    setUserInfo,
    listings,
    setListings,
    isMapView,
    userInfo,
    wishLists,
    setWishLists,
    setSearchLocation,
    setMaxValueRange,
    setMinValueRange,
    discardSearch,
    setLoadingUser,
    setLoadingData,
    filter,
  } = userAppStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      setSearchLocation(undefined);
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
      const { data, maxPrice, minPrice } = await getAllListings(
        locationType,
        userInfo?.typeUser
      );
      setListings(data);
      setMaxValueRange(maxPrice);
      setMinValueRange(minPrice);
      const wishlists = await getUserWishlists(userInfo?.id);
      const wishListsId = wishlists?.map(({ listing }) => listing.id);
      setWishLists(wishListsId);
      setLoadingData(false);
    };
    getData();
  }, [setListings, setWishLists, userInfo?.id, locationType, discardSearch]);

  const countTrueValues = () => {
    let count = 0;
    let hasSpecial = false;

    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        if (key === "coffe" || key === "lunch" || key === "dinner") {
          if (!hasSpecial) {
            hasSpecial = true;
            count += 1;
          }
        } else {
          count += 1;
        }
      }
    });

    return count;
  };

  return (
    isClient && (
      <div className="max-h-[100vh] h-[100vh]">
        <Navbar />
        
        <div className="w-full flex justify-between gap-5 items-center mt-3 px-6 md:px-20 ">
          <div className="swiper w-[90%]" id="slider5">
            <div className="swiper-wrapper  px-10">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: ".swiper-button-next-listingTypes",
                  prevEl: ".swiper-button-prev-listingTypes",
                }}
                breakpoints={{
                  1024: {
                    slidesPerView: listingTypes?.length,
                    spaceBetween: 30,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                }}
              >
                <SwiperSlide className="!w-fit">
                  <div
                    onClick={() => setLocationType("All")}
                    className="w-max flex flex-col items-center justify-between h-16 cursor-pointer hover:text-[#3232FF] text-[#000033]"
                  >
                    <span className="h-10 w-10  flex items-center justify-center">
                      <Dammuso />
                    </span>
                    <div
                      className="text-xs font-semibold break-keep"
                      style={{ width: "inherit" }}
                    >
                      All
                    </div>
                  </div>
                </SwiperSlide>
                {listingTypes.map((data, index) => (
                  <SwiperSlide className="!w-fit" key={index}>
                    <div
                      onClick={() => setLocationType(data.name)}
                      className="w-max flex flex-col items-center justify-between h-16 cursor-pointer hover:text-[#3232FF] text-[#000033]"
                    >
                      <span className="h-10 w-10  flex items-center justify-center">
                        {data.svgPath}
                      </span>
                      <div
                        className="text-xs font-semibold break-keep"
                        style={{ width: "inherit" }}
                      >
                        {data.name}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <button className="swiper-button-prev-listingTypes grid place-content-center bg-white shadow-md shadow-[#00000069] left-2 p-1 transition border border-gray-600  hover:border-2 rounded-full absolute z-[999] top-[44%] -translate-y-1/2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-w-4 rtl:-rotate-90 rotate-90"
              >
                <path
                  d="M19 9L12 15L5 9"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <button className="swiper-button-next-listingTypes grid place-content-center bg-white shadow-md shadow-[#00000069] right-2  p-1 transition border border-gray-600  hover:border-2 rounded-full absolute z-[999] top-[44%] -translate-y-1/2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-w-4 rtl:rotate-90 -rotate-90"
              >
                <path
                  d="M19 9L12 15L5 9"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="relative font-semibold w-[8%] py-3 flex justify-evenly items-center border-2 border-black rounded-lg"
          >
            <IoFilterOutline size={20} />
            <span>Filters</span>
            {countTrueValues() !== 0 && (
              <span className="absolute -top-2 -right-2 rounded-full bg-black border border-white px-2 py-[3px] text-white text-[11px]">
                {countTrueValues()}
              </span>
            )}
          </button>
        </div>

        {isMapView ? <MapView /> : <ListView />}
        <ViewSwitchBadge />
        <CompactFooter />
        {!isDesktop && <NavbarMobile />}
        {isAuthModalOpen && <AuthModal />}
        {showFilter && (
          <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
        )}
      </div>
    )
  );
}
