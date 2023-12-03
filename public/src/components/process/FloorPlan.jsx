import { userAppStore } from "airbnb/store/store";
import React, { useState } from "react";

import "../../styles/tailwind.css";

export default function FloorPlan() {
  const { placeSpace, setPlaceSpace } = userAppStore();

  const handleChangeGuest = (e) => {
    setPlaceSpace({ ...placeSpace, guests: e.target.value });
  };

  return (
    <div className="flex items-center justify-stretch md:justify-center h-full flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg md:text-3xl lg:text-4xl">
          Share some basics about your place
        </h2>
        <p className="text-xs md:text-base">
          You'll add more details later, such as bed types.
        </p>
      </div>
      <div className="flex justify-center items-center w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] gap-5">
        <span className="font-semibold whitespace-nowrap">Guest Number :</span>
        <input
          type="number"
          className="form-input"
          min={0}
          onChange={(e) => handleChangeGuest(e)}
        />
      </div>
    </div>
  );
}
