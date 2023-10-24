import { userAppStore } from "airbnb/store/store";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Dammuso from "airbnb/svg/lisitngTypes/dammuso";

export default function ListingPhotos() {
  const { currentListing } = userAppStore();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPhotos, setCurrentPhotos] = useState([]);

  useEffect(()=> {
    setCurrentPhotos(currentListing.photos);
  },[]);

  return (
    <div className="relative grid gap-2" style={{ gridTemplateColumns: "55fr 45fr" }}>
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
