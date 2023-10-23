import React from "react";
import ListingCard from "../listingCard";
import { userAppStore } from "airbnb/store/store";

export default function ListView() {
  const { listings } = userAppStore();
  return (
    <div className="py-10 px-20 justify-start items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5  gap-8">
      {listings?.map((listing, index) => (
        <ListingCard data={listing} key={index} />
      ))}
    </div>
  );
}
