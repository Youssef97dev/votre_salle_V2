import React, { useState } from "react";
import { addDays } from "date-fns";
import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { useMediaQuery } from "airbnb/hooks/useMediaQuery";

export default function Calender({ state, setState, disabledDates = [] }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div className="w-full">
      {!isDesktop ? (
        <DateRange
          onChange={(item) => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="vertical"
          className="w-full"
          disabledDates={disabledDates}
          minDate={addDays(new Date(), 0)}
        />
      ) : (
        <DateRangePicker
          onChange={(item) => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          editableDateInputs={true}
          months={2}
          ranges={state}
          direction="horizontal"
          disabledDates={disabledDates}
          minDate={addDays(new Date(), 0)}
        />
      )}
    </div>
  );
}
