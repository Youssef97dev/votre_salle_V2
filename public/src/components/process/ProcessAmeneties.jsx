import { AmenetiesType } from "airbnb/data/Amenities";
import { userAppStore } from "airbnb/store/store";
import React from "react";

export default function ProcessAmeneties() {
  const { placeAmeneties, setPlaceAmenities, locationType } = userAppStore();
  console.log(locationType);
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
    <div className="flex flex-col gap-6 p-6 w-full h-full rounded-lg">
      <div className="pb-5 border-b border-[#dbdcdf] w-fit">
        <h2 className="font-extrabold text-2xl ">
          Tell guests what your place has to offer
        </h2>
        <span className="text-sm">
          You can add more amenities after you publish your listing.
        </span>
      </div>
      <div className="flex flex-col gap-5 w-full max-h-[63vh] md:max-h-[65vh] px-3 overflow-auto scroll">
        {AmenetiesType.filter(
          ({ type }) =>
            type === locationType || type === "safety" || type === "basic"
        ).map(({ type, data }) => (
          <div key={type} className="flex flex-col gap-5">
            {type === locationType && (
              <span className="text-base md:text-md font-medium">
                Do you have any {`${locationType}`} amenities?
              </span>
            )}
            {type === "safety" && (
              <span className="text-base md:text-md font-medium">
                Do you have any of these safety items?
              </span>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 my-2">
              {data.map(({ name, svgPath }) => (
                <button
                  key={name}
                  className={`flex flex-row gap-3 md:gap-0 items-center justify-center md:flex-col font-semibold border border-gray-300 rounded-md p-2 hover:border-gray-950 transition-all duration-300 ${
                    placeAmeneties?.find((amentiy) => amentiy === name) &&
                    "border-gray-950"
                  }`}
                  onClick={() => {
                    placeAmeneties?.includes(name)
                      ? removeAmenty(name)
                      : addAmenety(name);
                  }}
                >
                  {svgPath}
                  <span className="text-sm md:text-base">{name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
