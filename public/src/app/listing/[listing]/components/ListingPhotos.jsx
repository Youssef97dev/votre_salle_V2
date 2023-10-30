import { userAppStore } from "airbnb/store/store";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Dammuso from "airbnb/svg/lisitngTypes/dammuso";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function ListingPhotos() {
  const { currentListing } = userAppStore();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPhotos, setCurrentPhotos] = useState([]);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(()=> {
    setCurrentPhotos(currentListing.photos);
  },[]);

  return (
    
    <div className="relative" >
      {/* Desktop Version */}
      {isDesktop && <div className="grid gap-2" style={{ gridTemplateColumns: "55fr 45fr" }}>
        <div className="relative w-full h-[60vh]">
          <Image alt="listing" fill src={currentPhotos[0]} className="rounded-xl" />
        </div>
        {currentListing.photos.length > 1 && (
          <ul className="grid gap-2 flex-wrap" style={{ gridTemplateColumns: "50fr 50fr", gridTemplateRows: "50fr 50fr" }}>
            {currentPhotos.slice(1,5).map((photo, index) => (
              <li
                key={index}
                className="relative w-full h-full cursor-pointer"
                onClick={() => setCurrentPhoto(index)}
              >
                <Image alt="listing" fill src={photo} className="rounded-xl" />
              </li>
            ))}
          </ul>
        )}
        {currentListing.photos.length > 5 && (
          <button
            className="absolute p-2 space-x-2 rounded-lg text-[#000] flex flex-row justify-end border border-black bottom-4 right-5  bg-[#FFFFFF] font-semibold text-sm cursor-pointer"
            onClick={() => setShowPopup(true)}
          >
          <Dammuso width_={20} height_={20} />
            <span>View More Photos</span>
          </button>
        )}
      </div>}
      {/* Mobile Version */}
      {!isDesktop && <Swiper
          modules={[Navigation, Pagination]}
          loop={true}
          navigation={{ nextEl: '.swiper-button-next-ex1', prevEl: '.swiper-button-prev-ex1' }}
          pagination={{ clickable: true }}
          className="swiper max-w-[18rem] xs:max-w-[30rem] md:max-w-[40rem] w-full mx-auto my-3 rounded-lg"
          id="slider1"
        >
        <div className="swiper-wrapper">
            {currentPhotos?.map((photo, i) => {
                return (
                    <SwiperSlide key={i}>
                        <img src={photo} className="w-full h-full object-cover" alt="itemImage" />
                    </SwiperSlide>
                );
            })}
        </div>
        <button className="swiper-button-prev-ex1 grid place-content-center left-2 p-1 transition text-primary text-white border border-primary  hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-1/2 -translate-y-1/2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-w-4 rtl:-rotate-90 rotate-90"><path d="M19 9L12 15L5 9" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
        <button className="swiper-button-next-ex1 grid place-content-center right-2 p-1 transition text-primary text-white border border-primary  hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-1/2 -translate-y-1/2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-w-4 rtl:rotate-90 -rotate-90"><path d="M19 9L12 15L5 9" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
      </Swiper>}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
          <div className={`relative h-[100vh] w-[100vw] bg-white p-5 overflow-auto ${showPopup ? 'transform translate-y-0 transition-transform duration-3000' : ''}`}>
              <ul className="grid grid-cols-2 gap-2 flex-wrap m-11 px-44" style={{ gridTemplateColumns: "50fr 50fr" }}>
                {currentListing.photos.map((photo, index) => (
                  <li key={index} className="cursor-pointer" >
                    <img alt="listing" fill src={photo} className="object-fit w-full h-full" />
                  </li>
                ))}
              </ul>
            <button className="absolute top-4 left-6 text-black font-semibold cursor-pointer" onClick={() => setShowPopup(false)}>
                X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
