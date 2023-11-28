"use client";
import React, { useEffect, useState } from "react";
import { userAppStore } from "airbnb/store/store";
import { getUserTripsByStatus } from "airbnb/lib/lisitng";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import ReviewModal from "./ReviewModal";

import "../../../styles/tailwind.css";

import { HiSearch } from "react-icons/hi";


const ReviewsClient = () => {

  const { userInfo, invoicedTrips,
    setInvoicedTrips,
    filteredInvoicedTrips,
    setFilteredInvoicedTrips,
    setTripToReview,
    loadingTrips,
    setLoadingTrips,
    showReviewModal,
    setShowReviewModal,
    relaunchTrips,
   } = userAppStore();

  const [search, setSearch] = useState('');

  const addReview = (trip) => {
    setTripToReview(trip);
    setShowReviewModal(true);
  }

  useEffect(()=>{
    const invoicedTrip = async() => {
      setLoadingTrips(true);
      const trips = await getUserTripsByStatus(userInfo?.id, "Invoice");
      setInvoicedTrips(trips.filter((trip) => {return !trip?.listing?.reviews?.some(review => review.userId === userInfo?.id)}));
      setFilteredInvoicedTrips(trips.filter((trip) => {return !trip?.listing?.reviews?.some(review => review.userId === userInfo?.id)}));
      setLoadingTrips(false);
    }
    invoicedTrip();
}, [relaunchTrips])

useEffect(() => {
  setFilteredInvoicedTrips(() => {
      return invoicedTrips.filter((trip) => {
          return trip.listing.title.toLowerCase().includes(search.toLowerCase()) || trip.listing.locationData.region.toLowerCase().includes(search.toLowerCase()) || trip.listing.locationData.place.toLowerCase().includes(search.toLowerCase());
      });
  });
}, [search]);

  return (
    <>
    {loadingTrips ? <Skeleton count={5} /> : (
      <div className="mb-5  py-2 space-y-2">
        <div className="relative w-[30%]">
            <input
                type="text"
                defaultValue={search}
                placeholder="Search..."
                className="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-9 placeholder:tracking-wider pr-11"
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="button" className="btn btn-primary absolute right-1 inset-y-0 m-auto rounded-full w-8 h-8 p-0 flex items-center justify-center">
              <HiSearch size={20} />
            </button>
        </div>
    <div className="px-4 py-2 rounded-lg space-y-4 overflow-x-auto overflow-y-auto  w-full block">
        {filteredInvoicedTrips?.map((trip, index) => {
            return (
                <div
                    key={index}
                    className="bg-white border-gray-400 border rounded-xl shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] p-2 flex items-center justify-between gap-3
                        text-gray-500 font-semibold min-w-[625px] hover:text-primary transition-all duration-300 hover:scale-[1.01]"
                >
                    <div className="flex items-center justify-start gap-3">
                      <div className="rounded-full w-20 h-20 p-0">
                          <img src={trip?.listing?.photos[0]} alt="img" className="w-full h-full rounded-md object-cover" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div>{trip?.listing?.title}</div>
                        <div>
                        {
                        new Date(trip?.tripinfo?.startDate).toLocaleDateString(undefined, {
                          month: "short",
                          day: "2-digit",
                        })}
                      {" - "}
                      {
                        new Date(trip?.tripinfo?.endDate).toLocaleDateString(undefined, {
                        month: "short",
                        day: "2-digit",
                      })}
                        </div>
                      </div>
                    </div>
                    <div className="cursor-pointer">
                        <button className="btn btn-dark" onClick={() => addReview(trip)}>Add Review</button>
                    </div>
                </div>
            );
        })}
    </div>

    {showReviewModal && (<ReviewModal />)}
    </div>
    )}
    </>
  )
}

export default ReviewsClient