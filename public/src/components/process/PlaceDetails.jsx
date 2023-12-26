import React, { useState } from "react";
import FormInput from "../common/FormInput";

import { userAppStore } from "airbnb/store/store";

export default function PlaceDetails() {
  const { locationData, setLocationData } = userAppStore();
  const handleChange = (name, value) => {
    setLocationData({ ...locationData, [name]: value });
  };

  return (
    <div className="flex flex-col gap-6 p-6 w-full h-full rounded-lg">
      <h2 className="font-extrabold text-2xl pb-5 border-b border-[#dbdcdf] w-fit">
        Confirm your address
      </h2>
      <div className="flex flex-col items-center gap-5 w-full h-full">
        <div className="flex gap-3 w-full">
          <div className="w-full">
            <label className="font-bold" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={locationData?.country}
              placeholder="Country"
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="font-bold" htmlFor="neighborhood">
              House, flat, bldg, etc.
            </label>
            <input
              type="text"
              name="neighborhood"
              id="neighborhood"
              value={locationData?.neighborhood}
              placeholder="House, flat, bldg, etc."
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <div className="w-full">
            <label className="font-bold" htmlFor="place">
              Area/village
            </label>
            <input
              type="text"
              name="place"
              id="place"
              value={locationData?.place}
              placeholder="Area/village (if applicable)"
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="font-bold" htmlFor="locality">
              Street Address
            </label>
            <input
              type="text"
              name="locality"
              id="locality"
              value={locationData?.locality}
              placeholder="Street Address"
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <div className="w-full">
            <label className="font-bold" htmlFor="landmark">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              id="landmark"
              value={locationData?.landmark}
              placeholder="earby landmark (if applicable)"
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="font-bold" htmlFor="district">
              City / town
            </label>
            <input
              type="text"
              name="district"
              id="district"
              value={locationData?.district}
              placeholder="City / town"
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <div className="w-full">
            <label className="font-bold" htmlFor="postcode">
              PIN
            </label>
            <input
              type="text"
              name="postcode"
              id="postcode"
              value={locationData?.postcode}
              placeholder="PIN code"
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="font-bold" htmlFor="postcode">
              Virtual Tour Link
            </label>
            <input
              type="url"
              name="tour"
              id="tour"
              value={locationData?.tour}
              placeholder="Vitual Tour 360 Link"
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
