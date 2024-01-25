import Image from "next/image";
import React from "react";

export default function StepOneStarter({ t }) {
  return (
    <div className="flex items-center h-full mx-5 my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4 text-airbnb-light-black">
          <h3 className="text-lg md:text-2xl font-bold">
            {t("page.new_listing.two.step_one")}
          </h3>
          <h1 className="text-lg md:text-2xl">
            <strong>{t("page.new_listing.two.title")}</strong>
          </h1>
          <p className="text-base">{t("page.new_listing.two.subtitle")}</p>
        </div>
        <div className="w-full h-full">
          <img src="/img4.png"></img>
        </div>
      </div>
    </div>
  );
}
