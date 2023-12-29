import Image from "next/image";
import React from "react";

export default function StepOneStarter() {
  return (
    <div className="flex items-center h-full mx-5 my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4 text-airbnb-light-black">
          <h3 className="text-lg md:text-2xl font-bold">Step 1</h3>
          <h1 className="text-lg md:text-2xl">
            <strong>Tel us about your Hall</strong>
          </h1>
          <p className="text-base">
            In this step, we'll ask you which type of hall you have. Then let us
            know the location and how many guests.
          </p>
        </div>
        <div className="w-full h-full">
          <img src="/img4.png"></img>
        </div>
      </div>
    </div>
  );
}
