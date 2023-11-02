import { userAppStore } from "airbnb/store/store";
import React from "react";

export default function Description() {
  const { description, setDescription } = userAppStore();
  return (
    <div className="flex flex-col gap-2 w-[95%] lg:w-[38%]">
      <span className="font-medium text-base md:text-xl">Description</span>
      <textarea
        className="border border-gray-400 h-40 w-full rounded-lg active:border-gray-950 p-1 lg:p-3 no-scrollbar text-lg "
        value={description}
        onChange={(e) => {
          if (e.target.value.length <= 500) {
            setDescription(e.target.value);
          }
        }}
      />
      <span className="text-xs md:text-base">{description.length}/500</span>
    </div>
  );
}
