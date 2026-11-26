import React, { useState, useEffect } from "react";
import { userAppStore } from "airbnb/store/store";

const ListingConditions = () => {
  const { currentListing, userInfo } = userAppStore();
  return (
    <div className="flex flex-col gap-2 w-full p-4 border border-[#d1d5db] rounded-xl shadow-lg">
      <span className="font-extrabold text-lg md:text-xl pb-3 border-b border-[#dbeafe]">
        Régles du salle
      </span>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2 w-full">
          <span className="font-bold text-base md:text-lg mb-3">
            Conditions d'annulation
          </span>
          <p className="font-medium text-sm md:text-base text-[#6e7582]">
            {currentListing?.conditions?.cancellation}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="font-bold text-base md:text-lg mb-3">
            Check-in time
          </span>

          <div className="flex text-[#6e7582] font-medium">
            <div className="flex flex-col gap-2 w-[30%]">
              <span>Check-in</span>
              <span>Check-out</span>
            </div>
            <div className="flex flex-col gap-2 w-[30%]">
              <span>
                {currentListing?.conditions?.first_check_in} -{" "}
                {currentListing?.conditions?.last_check_in}
              </span>
              <span>
                {currentListing?.conditions?.first_check_out} -{" "}
                {currentListing?.conditions?.last_check_out}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingConditions;
