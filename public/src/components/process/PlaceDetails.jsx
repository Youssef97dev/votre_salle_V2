import React, { useState } from "react";
import FormInput from "../common/FormInput";

import { userAppStore } from "airbnb/store/store";

export default function PlaceDetails({ t }) {
  const { locationData, setLocationData } = userAppStore();
  const handleChange = (name, value) => {
    setLocationData({ ...locationData, [name]: value });
  };

  return (
    <div className="flex flex-col gap-6 md:p-6 p-2 w-full h-full rounded-lg">
      <h2 className="font-extrabold text-2xl pb-5 border-b border-[#dbdcdf] w-fit">
        {t("page.new_listing.five.title")}
      </h2>
      <div className="flex flex-col items-center gap-5 w-full h-full">
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <div className="w-full">
            <label className="font-bold" htmlFor="country">
              {t("page.new_listing.five.country")}
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={locationData?.country}
              placeholder={`${t("page.new_listing.five.country")}`}
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="font-bold" htmlFor="neighborhood">
              {t("page.new_listing.five.type")}
            </label>
            <input
              type="text"
              name="neighborhood"
              id="neighborhood"
              value={locationData?.neighborhood}
              placeholder={`${t("page.new_listing.five.type")}`}
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <div className="w-full">
            <label className="font-bold" htmlFor="place">
              {t("page.new_listing.five.area")}
            </label>
            <input
              type="text"
              name="place"
              id="place"
              value={locationData?.place}
              placeholder={`${t("page.new_listing.five.area")}`}
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="font-bold" htmlFor="locality">
              {t("page.new_listing.five.street")}
            </label>
            <input
              type="text"
              name="locality"
              id="locality"
              value={locationData?.locality}
              placeholder={`${t("page.new_listing.five.street")}`}
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <div className="w-full">
            <label className="font-bold" htmlFor="landmark">
              {t("page.new_listing.five.landmark")}
            </label>
            <input
              type="text"
              name="landmark"
              id="landmark"
              value={locationData?.landmark}
              placeholder={`${t("page.new_listing.five.landmark")}`}
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="font-bold" htmlFor="district">
              {t("page.new_listing.five.city")}
            </label>
            <input
              type="text"
              name="district"
              id="district"
              value={locationData?.district}
              placeholder={`${t("page.new_listing.five.city")}`}
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <div className="w-full">
            <label className="font-bold" htmlFor="postcode">
              {t("page.new_listing.five.zip")}
            </label>
            <input
              type="text"
              name="postcode"
              id="postcode"
              value={locationData?.postcode}
              placeholder={`${t("page.new_listing.five.zip")}`}
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="font-bold" htmlFor="postcode">
              {t("page.new_listing.five.virtual")}
            </label>
            <input
              type="url"
              name="tour"
              id="tour"
              value={locationData?.tour}
              placeholder={`${t("page.new_listing.five.virtual")}`}
              className="form-input rounded-2xl focus:shadow-lg"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
