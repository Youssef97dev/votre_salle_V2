import React from "react";
import ListingCard from "../listingCard";
import { userAppStore } from "airbnb/store/store";

export default function ListView() {
  const { listings } = userAppStore();
  return (
    <div className="py-10 px-6 md:px-20 justify-start items-start grid grid-cols-1 xs:grid-cols-2 medium:grid-cols-3 2lg:grid-cols-4 2xl:grid-cols-5  gap-8">
      {listings?.map((listing, index) => (
        <ListingCard data={listing} key={index} />
      ))}
    </div>
  );
}
