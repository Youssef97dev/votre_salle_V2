import Image from "next/image";
import React from "react";

export default function StepTwoStarter() {
  return (
    <div className="flex items-center h-full mx-5 md:mx-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 items-center">
        <div className="flex flex-col gap-4 text-airbnb-light-black">
          <h3 className="text-lg md:text-2xl">Step 2</h3>
          <h1 className="text-xl md:text-4xl">
            <strong>Make your hall stand out</strong>
          </h1>
          <p className="text-base md:text-xl">
            In this step, you’ll add some of the amenities your place offers,
            plus 5 or more photos. Then you’ll create a title, description,
            guests number and price.
          </p>
        </div>
        <div className="w-full h-full">
          <img src="/img4.png"></img>
        </div>
      </div>
    </div>
  );
}
