import { userAppStore } from "airbnb/store/store";
import Description from "./Description";
import Price from "./Price";
import React from "react";

export default function Title() {
  const { title, setTitle } = userAppStore();
  return (
    <>
      <div className="flex flex-col gap-5 items-center justify-center text-airbnb-light-black">
        {/*<div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-4xl">
                      Now, let's give your house a title
                    </h2>
                    <p>
                      Short titles work best. Have fun with it – you can always change it
                      later
                    </p>
                </div>*/}
        <div className="flex flex-col gap-2 w-[95%] lg:w-[38%]">
          <span className="font-medium text-base md:text-xl">Title</span>
          <input
            type="text"
            className="border border-gray-400 w-full rounded-lg active:border-gray-950 p-1 lg:p-3 no-scrollbar text-lg md:text-3xl lg:text-4xl"
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= 32) {
                setTitle(e.target.value);
              }
            }}
          />
          <span className="text-xs md:text-base">{title.length}/32</span>
        </div>
        <Description />
        <Price />
      </div>
    </>
  );
}
