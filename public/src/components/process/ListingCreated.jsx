import { createLisitngAPI, updateLisitngAPI } from "airbnb/lib/lisitng";
import { userAppStore } from "airbnb/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Confetti from "react-confetti";

export default function ListingCreated({ listingId, t }) {
  const router = useRouter();
  const {
    locationType,
    placeType,
    mapData,
    locationData,
    guests,
    placeAmeneties,
    photos,
    title,
    description,
    price,
    priceB2b,
    userInfo,
    tax,
    conditions,
  } = userAppStore();
  useEffect(() => {
    if (listingId === "" || listingId === null) {
      createLisitngAPI({
        locationType,
        placeType,
        mapData,
        locationData,
        guests: parseInt(guests),
        placeAmeneties,
        photos,
        title,
        description,
        price,
        priceB2b,
        listingCreatedBy: { id: userInfo?.id },
        tax,
        conditions,
      });
    } else {
      updateLisitngAPI(listingId, {
        locationType,
        placeType,
        mapData,
        locationData,
        guests: parseInt(guests),
        placeAmeneties,
        photos,
        title,
        description,
        price,
        priceB2b,
        listingCreatedBy: { id: userInfo?.id },
        tax,
        conditions,
      });
    }
  }, [
    locationType,
    placeType,
    mapData,
    locationData,
    guests,
    placeAmeneties,
    photos,
    title,
    description,
    price,
    priceB2b,
    userInfo,
    tax,
    conditions,
  ]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="font-semibold text-4xl">
          {t("page.new_listing.ten.title")}
        </h2>
        <p>
          {listingId === ""
            ? `${t("page.new_listing.ten.subtitle_create")}`
            : `${t("page.new_listing.ten.subtitle_update")}`}
        </p>
        <div className="flex gap-5">
          <button
            className="bg-[#222222] py-3 mt-5  px-10 text-white text-base font-medium rounded-md cursor-pointer"
            onClick={() => router.push("/")}
          >
            {t("page.new_listing.ten.visite")}
          </button>
          <button
            className="bg-airbnb-gradient py-3 mt-5  px-5 text-white text-base font-medium rounded-md cursor-pointer"
            onClick={() => router.push("/my-listings")}
          >
            {t("page.new_listing.ten.view")}
          </button>
        </div>
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    </div>
  );
}
