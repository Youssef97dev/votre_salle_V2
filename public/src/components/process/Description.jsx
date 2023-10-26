import { userAppStore } from "airbnb/store/store";
import React from "react";

export default function Description() {
  const { description, setDescription } = userAppStore();
  return (
    <div className="flex  items-center justify-center text-airbnb-light-black">
      <div className="flex flex-col gap-5">
        {/*<div className="flex flex-col gap-2">
          <h2 className="font-semibold text-4xl">Create your description</h2>
          <p>Share what makes your place special.</p>
  </div>*/}
        <div className="flex flex-col gap-4">
          <span className="font-medium text-xl">Description</span>
          <textarea
            className="border border-gray-400 h-40 w-[550px] rounded-lg active:border-gray-950 p-3 no-scrollbar text-lg "
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setDescription(e.target.value);
              }
            }}
          />
          <span>{description.length}/500</span>
        </div>
      </div>
    </div>
  );
}
