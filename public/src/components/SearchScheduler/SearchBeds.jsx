import useClickOutside from "airbnb/hooks/useClickOutside";
import { userAppStore } from "airbnb/store/store";
import React, { useEffect, useRef } from "react";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import "../../styles/tailwind.css";

export default function SearchBeds() {
  const { selectionType, searchPlaceSpace, setSearchPlaceSpace } =
    userAppStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const handleChange = (e) => {
    setSearchPlaceSpace({
      ...searchPlaceSpace,
      guests: e.target.value,
    });
  };

  const [containerRef] = useClickOutside();

  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="" className="text-xs font-semibold">
          Who
        </label>
        <span>
          {searchPlaceSpace.guests + " "}
          guests
        </span>
      </div>
      {selectionType === "who" && (
        <div
          className={`${
            isDesktop
              ? "absolute w-96 right-0 h-max top-24 shadow-lg rounded-3xl bg-white py-5 px-5 z-50"
              : "w-full mt-3"
          }`}
          ref={isDesktop ? containerRef : null}
        >
          {/*<ul className="flex flex-col gap-5">
            {Object.keys(searchPlaceSpace).map((place) => (
              <li
                className="flex justify-between w-full text-sm font-medium md:text-lg items-center"
                key={place}
              >
                <span className="capitalize">{place}</span>
                <div className="flex gap-3 items-center justify-between w-36 md:w-48">
                  <button
                    className="border border-gray-200  py-[1px] md:py-[10px] rounded-full px-[8px] md:px-[20px] flex items-center justify-center hover:border-gray-500"
                    onClick={() => handleDecrement(place)}
                  >
                    -
                  </button>
                  <span className="min-w-[20px]">
                    {searchPlaceSpace[place]}
                  </span>
                  <button
                    className="border border-gray-200  py-[1px]  md:py-[10px] rounded-full px-[6px] md:px-[18px] flex items-center justify-center hover:border-gray-500"
                    onClick={() => handleIncrement(place)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
            </ul>*/}
          <div className="flex flex-row justify-center items-center gap-3">
            <span className="font-medium whitespace-nowrap">Guests :</span>
            <input
              type="number"
              min={0}
              className="form-input"
              onChange={(e) => handleChange(e)}
              defaultValue={searchPlaceSpace.guests}
            />
          </div>
        </div>
      )}
    </>
  );
}
