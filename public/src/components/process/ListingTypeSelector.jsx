import { listingTypes } from "airbnb/data/listingTypes";
import { userAppStore } from "airbnb/store/store";
import Image from "next/image";
import React, { useState } from "react";

export default function ListingTypeSelector({ t }) {
  const { locationType, setLocationType } = userAppStore();
  console.log("locationType: ", locationType);
  const handleSelection = (type) => {
    setLocationType(type);
  };

  return (
    <div className="flex flex-col gap-6 p-2 md:p-6 w-full h-full rounded-lg">
      <h2 className="font-extrabold text-2xl pb-5 border-b border-[#dbdcdf] w-fit">
        {t("page.new_listing.three.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 px-3 overflow-auto scroll no-scrollbar">
        {listingTypes.map((type) => (
          <button
            key={type.name}
            className={`flex flex-row gap-3 md:gap-0 items-center md:flex-col font-semibold border border-gray-300 rounded-md p-2 hover:border-gray-950 transition-all duration-300 ${
              type.name === locationType && "border-gray-950 bg-[#2195f37a]"
            }`}
            onClick={() => handleSelection(type.name)}
          >
            {type.svgPath}
            <span className="text-sm md:text-base">{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
