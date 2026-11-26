import { AmenetiesType } from "airbnb/data/Amenities";
import { userAppStore } from "airbnb/store/store";
import React, { useState } from "react";

export default function ListingAmenties({ t }) {
  const { currentListing } = userAppStore();
  const [showPopup, setShowPopup] = useState(false);

  function getSvgPathByName(name) {
    for (const amenity of AmenetiesType) {
      for (const data of amenity.data) {
        if (data.name === name) {
          return data.svgPath;
        }
      }
    }
    return null;
  }

  return (
    <div className="flex flex-col gap-2 w-full p-4 border border-[#d1d5db] rounded-xl shadow-lg">
      <span className="font-extrabold text-lg md:text-xl pb-3 border-b border-[#dbeafe]">
        {t("page.listing.ameneties")}
      </span>
      <ul className="grid md:grid-cols-3 gap-3 grid-cols-1 pb-3 border-b border-[#dbeafe]">
        {currentListing.placeAmeneties?.slice(0, 11).map((amenity) => (
          <li
            key={amenity}
            className="text-sm md:text-base font-bold text-[#6e7582]"
          >
            {amenity}
          </li>
        ))}
        {/*<li onClick={() => setShowPopup(true)} className=" cursor-pointer border border-gray-300 p-2 rounded-lg flex flex-row md:flex-col justify-start items-center md:items-start" >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 md:pr-0" width={35} height={35} viewBox="0 0 100 100" id="more"><g><path d="M50 12c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zm0 72c-18.8 0-34-15.2-34-34s15.2-34 34-34 34 15.2 34 34-15.2 34-34 34zm0-41c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 10c-1.7 0-3-1.4-3-3 0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.6-1.3 3-3 3zm20-10c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 10c-1.7 0-3-1.4-3-3 0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.6-1.3 3-3 3zM30 43c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 10c-1.7 0-3-1.4-3-3 0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.6-1.3 3-3 3z"></path></g><g><path fill="#00F" d="M664-1210V474h-1784v-1684H664m8-8h-1800V482H672v-1700z"></path></g></svg>
          <span className="text-sm font-medium">Show More</span>
        </li>*/}
      </ul>
      {currentListing?.placeAmeneties?.length > 11 && (
        <button
          className="btn btn-outline-dark w-full md:w-[50%] lg:w-[25%] rounded-full font-bold"
          onClick={() => setShowPopup(true)}
        >
          {t("button.show")} {currentListing?.placeAmeneties?.length}{" "}
          {t("page.listing.ameneties")}
        </button>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-end md:items-center justify-center bg-gray-900 bg-opacity-80 z-50">
          <div
            className={`relative w-full h-[98%] md:h-[75vh] md:w-[35vw] md:rounded-xl rounded-t-xl bg-white p-5 overflow-hidden  ${
              showPopup
                ? "transform translate-y-0 transition-transform duration-3000"
                : ""
            }`}
          >
            <div className="w-full h-full overflow-auto  mt-8 pb-8">
              <ul className="flex flex-col gap-2">
                <span className="font-semibold">{t("listing.hall_offer")}</span>
                {currentListing.placeAmeneties?.map((amenity) => (
                  <li
                    key={amenity}
                    className="border border-gray-300 p-2 rounded-lg flex flex-row justify-start items-center"
                  >
                    {getSvgPathByName(amenity)}
                    <span className="text-sm font-medium">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="absolute top-4 left-6 text-black font-semibold cursor-pointer"
              onClick={() => setShowPopup(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
