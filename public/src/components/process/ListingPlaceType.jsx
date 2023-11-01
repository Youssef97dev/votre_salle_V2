import { userAppStore } from "airbnb/store/store";
import House from "airbnb/svg/lisitngTypes/house";
import Room from "airbnb/svg/lisitngTypes/room";
import SharedRoom from "airbnb/svg/lisitngTypes/shared-room";
import React, { useState } from "react";

export default function ListingPlaceType() {
  const { placeType, setPlaceType } = userAppStore();
  const handleSelection = (place) => {
    setPlaceType(place);
  };
  const data = [
    {
      title: "An entire place",
      subTitle: "Guests have the whole place to themselves.",
      svg: <House />,
    },
    {
      title: "A room",
      subTitle:
        "Guests have their own room in a home, plus access to shared spaces.",
      svg: <Room />,
    },
    {
      title: "A shared room",
      subTitle:
        "Guests sleep in a room or common area that may be shared with you or others.",
      svg: <SharedRoom />,
    },
  ];
  return (
    <div className="flex items-center justify-stretch md:justify-center  flex-col h-full gap-5 md:gap-10">
      <h2 className="font-semibold text-lg md:text-3xl lg:text-4xl mx-2">
        Which of these best describes your place?
      </h2>
      <ul className="flex flex-col gap-5 w-[90%]">
        {data.map((place) => (
          <li
            key={place.title}
            className={`flex border border-gray-300 p-2 md:p-7 justify-between rounded-lg hover:border-gray-500 cursor-pointer ${
              placeType === place.title && "border-gray-950 bg-slate-100"
            }`}
            onClick={() => handleSelection(place.title)}
          >
            <div>
              <h4 className="font-semibold text-xs sm:text-sm md:text-base">{place.title}</h4>
              <p className="text-xs sm:text-sm md:text-base">{place.subTitle}</p>
            </div>
            {place.svg}
          </li>
        ))}
      </ul>
    </div>
  );
}
