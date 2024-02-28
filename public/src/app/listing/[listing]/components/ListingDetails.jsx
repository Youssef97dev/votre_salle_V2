import React, { useState, useEffect } from "react";
import { userAppStore } from "airbnb/store/store";
import useAverageRating from "airbnb/hooks/useAverageRating";

// Icons
import { IoPersonOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

const ListingDetails = ({ t }) => {
  const { currentListing, userInfo } = userAppStore();
  const rating = useAverageRating(currentListing?.reviews);

  return (
    <div className="flex flex-col gap-4 w-full p-4 border border-[#d1d5db] rounded-xl shadow-lg">
      <span className="px-3 py-1 text-xs rounded-xl bg-[#dbeafe] text-[#805dca] font-bold w-fit">
        {currentListing?.locationType}
      </span>
      <span className="font-extrabold text-xl md:text-2xl lg:text-3xl">
        {currentListing?.title} {t("page.listing.in")}{" "}
        {currentListing?.locationData?.region}
      </span>
      <div className="flex items-center gap-5">
        {rating > 0 && (
          <span className="font-bold flex items-center gap-1">
            <FaStar color="f97316" size={15} />{" "}
            <span className="text-sm">{rating.toFixed(1)}</span>
            <span className="text-sm text-[#99a3b3]">{`(${currentListing?.reviews?.length})`}</span>
          </span>
        )}
        <div className="flex items-center gap-1 text-[#6e7582]">
          <IoLocationOutline />
          <span className="font-bold text-sm md:text-base">
            {currentListing?.locationData?.place},{" "}
            {currentListing?.locationData?.country}
          </span>
        </div>
      </div>
      <span className="font-bold pb-3 border-b border-[#d1d5db] text-sm md:text-base">
        <span className="!text-[#6e7582]">{t("page.listing.hosted_by")}</span>{" "}
        {currentListing?.listingCreatedBy?.firstName}{" "}
        {currentListing?.listingCreatedBy?.lastName}
      </span>
      <div className="flex items-center gap-4 pt-3 text-xs md:text-sm text-[#6e7582] font-bold">
        <div className="inline-flex items-center gap-2">
          <IoPersonOutline size={15} color="#6e7582" />{" "}
          {currentListing?.placeSpace?.guests} {t("page.listing.guests")}
        </div>
        <div className="inline-flex items-center gap-2">
          <FaRegStar size={15} color="#6e7582" />{" "}
          {currentListing?.reviews?.length} {t("page.listing.reviews")}
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
