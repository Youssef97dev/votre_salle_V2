import React from "react";
import { userAppStore } from "airbnb/store/store";

const Conditions = ({ t }) => {
  const { conditions, setConditions } = userAppStore();
  const handleChange = (name, value) => {
    setConditions({ ...conditions, [name]: value });
  };
  return (
    <div className="flex flex-col gap-6 md:p-6 p-2 w-full h-full rounded-lg">
      <h2 className="font-extrabold text-2xl pb-5 border-b border-[#dbdcdf] w-fit">
        {t("page.new_listing.conditions.title")}
      </h2>
      <div className="flex flex-col items-center gap-5 w-full h-full">
        <div className="w-full">
          <label className="font-bold" htmlFor="gridCancellation">
            {t("page.new_listing.conditions.subtitle_cancellation")}
          </label>
          <textarea
            id="gridCancellation"
            name="cancellation"
            type="text"
            className="form-input h-28 no-scrollbar"
            value={conditions?.cancellation}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                handleChange(e.target.name, e.target.value);
              }
            }}
          />
          <span className="text-xs md:text-base">
            {conditions?.cancellation.length}/500
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <div className="w-full">
            <label className="font-bold" htmlFor="place">
              {t("page.new_listing.conditions.checkIn")}
            </label>
            <input
              type="time"
              name="check_in"
              id="check_in"
              min="08:00"
              max="18:00"
              value={conditions?.check_in}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form-input rounded-2xl focus:shadow-lg"
            />
          </div>
          <div className="w-full">
            <label className="font-bold" htmlFor="locality">
              {t("page.new_listing.conditions.checkOut")}
            </label>
            <input
              type="time"
              name="check_out"
              id="check_out"
              min="08:00"
              max="18:00"
              value={conditions?.check_out}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form-input rounded-2xl focus:shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conditions;
