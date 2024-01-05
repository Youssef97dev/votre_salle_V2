import React, { useState, useEffect } from "react";
import { userAppStore } from "airbnb/store/store";

// Icons
import { IoPersonOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";

const ListingDetails = () => {
  const { currentListing, userInfo } = userAppStore();

  return (
    <div className="flex flex-col gap-2 w-full p-4 border border-[#d1d5db] rounded-xl shadow-lg">
      <span className="px-3 py-1 text-xs rounded-xl bg-[#dbeafe] text-[#805dca] font-bold w-fit">
        {currentListing?.locationType}
      </span>
      <span className="font-extrabold text-xl md:text-2xl lg:text-3xl">
        {currentListing?.title} in {currentListing?.locationData?.region}
      </span>
      <span className="font-bold pb-3 border-b border-[#d1d5db] text-sm md:text-base">
        <span className="!text-[#6e7582]">Hosted by</span>{" "}
        {currentListing?.listingCreatedBy?.firstName}{" "}
        {currentListing?.listingCreatedBy?.lastName}
      </span>
      <div className="flex items-center gap-4 pt-3 text-xs md:text-sm text-[#6e7582] font-bold">
        <div className="inline-flex items-center gap-2">
          <IoPersonOutline size={15} color="#6e7582" />{" "}
          {currentListing?.placeSpace?.guests} Guests
        </div>
        <div className="inline-flex items-center gap-2">
          <FaRegStar size={15} color="#6e7582" />{" "}
          {currentListing?.reviews?.length} Reviews
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
