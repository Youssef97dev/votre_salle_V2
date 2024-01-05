import React, { useState, useEffect } from "react";
import { userAppStore } from "airbnb/store/store";

const ListingDescription = () => {
  const { currentListing, userInfo } = userAppStore();
  return (
    <div className="flex flex-col gap-2 w-full p-4 border border-[#d1d5db] rounded-xl shadow-lg">
      <span className="font-extrabold text-lg md:text-xl pb-3 border-b border-[#dbeafe]">
        Description
      </span>
      <p className="text-sm md:text-base font-bold text-[#6e7582]">
        {currentListing?.description}
      </p>
    </div>
  );
};

export default ListingDescription;
