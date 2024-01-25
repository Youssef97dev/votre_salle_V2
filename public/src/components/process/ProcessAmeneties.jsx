import { AmenetiesType } from "airbnb/data/Amenities";
import { userAppStore } from "airbnb/store/store";
import React, { useState, useEffect } from "react";

export default function ProcessAmeneties({ t }) {
  const { placeAmeneties, setPlaceAmenities, locationType } = userAppStore();
  const [amenety, setAmenety] = useState({ name: "" });
  const [listAmeneties, setListAmeneties] = useState(AmenetiesType);

  const newAmeneneties = () => {
    setListAmeneties((prevState) => {
      const newState = [...prevState]; // Create a shallow copy of the state array

      // Find the 'other' type within the state array
      const otherTypeIndex = newState.findIndex(
        (type) => type.type === "other"
      );

      if (otherTypeIndex !== -1) {
        // If 'other' type exists, update its 'data' array by concatenating the new data
        newState[otherTypeIndex] = {
          ...newState[otherTypeIndex],
          data: [...newState[otherTypeIndex].data, { ...amenety }],
        };
      } else {
        // If 'other' type doesn't exist, create it and assign the new data
        newState.push({ type: "other", data: newOtherData });
      }

      return newState; // Return the updated state
    });
  };

  const addAmenety = (name) => {
    setPlaceAmenities([...placeAmeneties, name]);
  };
  const removeAmenty = (name) => {
    const index = placeAmeneties.findIndex((amenetiy) => amenetiy === name);
    if (index) {
      const clonedAmenties = [...placeAmeneties];
      clonedAmenties.splice(index, 1);
      setPlaceAmenities(clonedAmenties);
    }
  };
  return (
    <div className="flex flex-col gap-6 p-2 md:p-6 w-full h-full rounded-lg">
      <div className="pb-5 border-b border-[#dbdcdf] w-fit">
        <h2 className="font-extrabold text-2xl ">
          {t("page.new_listing.seven.title")}
        </h2>
        <span className="text-sm">{t("page.new_listing.seven.subtitle")}</span>
      </div>
      <div className="flex flex-col gap-5 w-full max-h-[63vh] md:max-h-[65vh] px-3 overflow-auto scroll ">
        {listAmeneties
          ?.filter(
            ({ type }) =>
              type === locationType ||
              type === "safety" ||
              type === "basic" ||
              type === "other"
          )
          .map(({ type, data }) => (
            <div key={type} className="flex flex-col gap-5">
              {type === locationType && (
                <span className="text-base md:text-md font-extrabold">
                  {t("page.new_listing.seven.you_have")} {`${locationType}`}{" "}
                  {t("page.new_listing.seven.ameneties")}?
                </span>
              )}

              {type === "safety" && (
                <span className="text-base md:text-md font-extrabold">
                  {t("page.new_listing.seven.safety_items")}
                </span>
              )}

              {type === "other" && data.length > 0 && (
                <span className="text-base md:text-md font-extrabold">
                  {t("page.new_listing.seven.other")}{" "}
                  {t("page.new_listing.seven.ameneties")}
                </span>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 my-2">
                {data.map(({ name, svgPath }) => (
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox peer"
                      checked={placeAmeneties?.includes(name) ? true : false}
                      onChange={() => {
                        placeAmeneties?.includes(name)
                          ? removeAmenty(name)
                          : addAmenety(name);
                      }}
                    />
                    <span className="peer-checked:text-[#4361ee] text-sm font-bold">
                      {name?.length > 15
                        ? name?.substring(0, 15) + "..."
                        : name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        <div className="flex items-center gap-3 w-full mb-2">
          <input
            type="text"
            name="amenities"
            id="amenities"
            placeholder={`${t("page.new_listing.seven.ameneties")}`}
            className="form-input rounded-2xl focus:shadow-lg"
            onChange={(e) => setAmenety({ ...amenety, name: e.target.value })}
          />
          <button
            onClick={() => newAmeneneties()}
            className="btn btn-secondary rounded-3xl font-bold whitespace-nowrap"
          >
            {t("page.new_listing.seven.add_amenety")}
          </button>
        </div>
      </div>
    </div>
  );
}
