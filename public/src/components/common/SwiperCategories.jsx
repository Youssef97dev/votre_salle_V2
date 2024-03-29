"use client";
import { listingTypes } from "airbnb/data/listingTypes";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import Dammuso from "airbnb/svg/lisitngTypes/dammuso";
import { IoFilterOutline } from "react-icons/io5";

const SwiperCategories = ({
  countTrueValues,
  setLocationType,
  setShowFilter,
}) => {
  return (
    <div className="w-full flex justify-between gap-5 items-center mt-3 px-3 md:px-20 ">
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
                className="w-max flex flex-col items-center justify-between h-fit cursor-pointer hover:text-[#3232FF] text-[#000033]"
              >
                <span className="h-10 w-10  flex items-center justify-center">
                  <Dammuso />
                </span>
                <div
                  className="text-xs font-bold break-keep"
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
                  className="w-max flex flex-col items-center justify-between h-fit cursor-pointer hover:text-[#3232FF] text-[#000033]"
                >
                  <span className="h-10 w-10  flex items-center justify-center">
                    {data.svgPath}
                  </span>
                  <div
                    className="text-xs font-bold break-keep"
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
        className="relative font-bold w-[8%] py-3 md:flex justify-evenly items-center border-2 border-black rounded-lg hidden"
      >
        <IoFilterOutline size={20} />
        <span>Filters</span>
        {countTrueValues !== 0 && (
          <span className="absolute -top-2 -right-2 rounded-full bg-black border border-white px-2 py-[3px] text-white text-[11px]">
            {countTrueValues}
          </span>
        )}
      </button>
    </div>
  );
};

export default SwiperCategories;
