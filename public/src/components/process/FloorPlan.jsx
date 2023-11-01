import { userAppStore } from "airbnb/store/store";
import React, { useState } from "react";

export default function FloorPlan() {
  const { placeSpace, setPlaceSpace } = userAppStore();

  const handleIncrement = (type) => {
    setPlaceSpace({ ...placeSpace, [type]: placeSpace[type] + 1 });
  };

  const handleDecrement = (type) => {
    if (placeSpace[type] > 1) {
      setPlaceSpace({ ...placeSpace, [type]: placeSpace[type] - 1 });
    }
  };

  return (
    <div className="flex items-center justify-stretch md:justify-center h-full flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg md:text-3xl lg:text-4xl">
          Share some basics about your place
        </h2>
        <p className="text-xs md:text-base" >You'll add more details later, such as bed types.</p>
      </div>
      <div className="flex  flex-col w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] gap-5">
        {Object.keys(placeSpace).map((place) => (
          <div
            className="flex justify-between w-full text-sm md:text-lg items-center"
            key={place}
          >
            <span className="capitalize ">{place}</span>
            <div className="flex gap-10 items-center justify-between w-48">
              <button
                className="border border-gray-200 py-[5px]  md:py-[10px] rounded-full px-3 md:px-5 flex items-center justify-center hover:border-gray-500"
                onClick={() => handleDecrement(place)}
              >
                -
              </button>
              <span className="min-w-[20px]">{placeSpace[place]}</span>
              <button
                className="border border-gray-200 py-[5px] md:py-[10px] rounded-full px-[10px] md:px-[18px] flex items-center justify-center hover:border-gray-500"
                onClick={() => handleIncrement(place)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
