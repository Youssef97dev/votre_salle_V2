import { userAppStore } from "airbnb/store/store";
import Daimond from "airbnb/svg/daimond";
import React, { useState, useEffect } from "react";
import { BsFillFlagFill } from "react-icons/bs";
import { addDays } from "date-fns";
import { addTrip } from "airbnb/lib/lisitng";
import { useRouter } from "next/navigation";
import { ClockLoader } from "react-spinners";

export default function TripScheduler() {
  const router = useRouter();
  const { currentListing, userInfo } = userAppStore();
  const [state, setState] = useState({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: addDays(new Date(), 7).toISOString().slice(0, 10),
  });

  const [guests, setGuests] = useState(0);
  const [loading, setLoading] = useState(false);

  const calculateDaysDifference = () => {
    const startDate = new Date(state.startDate);
    const endDate = new Date(state.endDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  const handleReservation = async () => {
    if (userInfo) {
      setLoading(true);
      const data = {
        listingId: currentListing.id,
        listing: currentListing,
        userId: userInfo?.id,
        tripData: {
          days: calculateDaysDifference(),
          startDate: state.startDate,
          endDate: state.endDate,
          guests,
          extraService: 0,
          listingPrice: parseFloat(
            userInfo?.typeUser === "B2B"
              ? currentListing.priceB2b
              : currentListing.price
          ).toFixed(2),
          tax: parseFloat(
            (userInfo?.typeUser === "B2B"
              ? currentListing.priceB2b
              : currentListing.price) *
              calculateDaysDifference() *
              (currentListing.tax / 100)
          ).toFixed(2),
          priceHT: parseFloat(
            (userInfo?.typeUser === "B2B"
              ? currentListing.priceB2b
              : currentListing.price) * calculateDaysDifference()
          ).toFixed(2),
          price: parseFloat(
            (userInfo?.typeUser === "B2B"
              ? currentListing.priceB2b
              : currentListing.price) *
              calculateDaysDifference() +
              (userInfo?.typeUser === "B2B"
                ? currentListing.priceB2b
                : currentListing.price) *
                calculateDaysDifference() *
                (currentListing.tax / 100)
          ).toFixed(2),
        },
      };
      //const response = await addTrip(data);
      //if (response) {
      //router.push("/trips");

      router.push(
        `/reservation/${currentListing.id}?data=${JSON.stringify(data)}`
      );
      setLoading(false);
      //}
    }
  };

  return (
    <div className="sticky top-0 w-full flex flex-col gap-6 items-center justify-center">
      <div className=" lg:border lg:border-gray-400 rounded-lg shadow-lg flex p-2 lg:p-4 gap-2 items-start px-4 lg:px-8 flex-col w-full">
        <div className="flex gap-1 text-lg">
          <span className="font-bold ">
            {userInfo?.typeUser === "B2B"
              ? currentListing.priceB2b.toFixed(2)
              : currentListing.price.toFixed(2)}{" "}
            MAD
          </span>
          <span>day</span>
        </div>
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-tl-md  cursor-pointer">
              <label className="font-semibold text-xs">CHECK-IN</label>
              <input
                type="date"
                className="text-sm accent-airbnb-theme-color"
                value={state.startDate.toString()}
                name="startDate"
                onChange={(e) =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-tr-md cursor-pointer">
              <label className="font-semibold text-xs">CHECK-OUT</label>
              <input
                type="date"
                className="text-sm accent-airbnb-theme-color"
                value={state.endDate.toString()}
                name="endDate"
                onChange={(e) =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <div>
              <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-b-md cursor-pointer">
                <label className="font-semibold text-xs">GUESTS</label>
                <input
                  type="number"
                  className="text-sm px-1 py-1 border-none outline-none"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-airbnb-gradient py-3 mt-5  px-5 flex flex-row justify-center items-center gap-3 text-white text-base font-medium rounded-md cursor-pointer w-full"
          onClick={handleReservation}
          //onClick={() => router.push(`/reservation/${currentListing.id}`)}
          disabled={
            loading ||
            (guests > currentListing.placeSpace.guests ? true : false)
          }
        >
          <ClockLoader color="#fbfffe" loading={loading} size={25} /> Reserve
        </button>
        <span className="text-center w-full">You won't be charged yet</span>
        <div className="flex  justify-between w-full">
          <span>
            {userInfo?.typeUser === "B2B"
              ? currentListing.priceB2b.toFixed(2)
              : currentListing.price.toFixed(2)}{" "}
            MAD x {calculateDaysDifference()} days
          </span>
          <span>
            {(
              (userInfo?.typeUser === "B2B"
                ? currentListing.priceB2b
                : currentListing.price) * calculateDaysDifference()
            ).toFixed(2)}{" "}
            MAD
          </span>
        </div>
        <div className="flex  justify-between w-full">
          <span>TVA</span>
          <span>
            {(
              (userInfo?.typeUser === "B2B"
                ? currentListing.priceB2b
                : currentListing.price) *
              calculateDaysDifference() *
              (currentListing.tax / 100)
            ).toFixed(2)}{" "}
            MAD
          </span>
        </div>
        <div className="flex  justify-between w-full">
          <span>Total After Taxe</span>
          <span>
            {(
              (userInfo?.typeUser === "B2B"
                ? currentListing.priceB2b
                : currentListing.price) *
                calculateDaysDifference() *
                (currentListing.tax / 100) +
              (userInfo?.typeUser === "B2B"
                ? currentListing.priceB2b
                : currentListing.price) *
                calculateDaysDifference()
            ).toFixed(2)}{" "}
            MAD
          </span>
        </div>
      </div>
      <div className="flex border border-gray-400 rounded-lg p-4 gap-2 items-start px-8">
        <span>
          <strong>This is a rare find. </strong>
          {currentListing?.listingCreatedBy?.firstName}'s place on Votre Salle
          is usually fully booked.
        </span>
        <Daimond />
      </div>
      <div className="flex gap-3 items-center cursor-pointer">
        <span>
          <BsFillFlagFill />
        </span>
        <span className="underline font-semibold">Report this listing</span>
      </div>
    </div>
  );
}
