import { userAppStore } from "airbnb/store/store";
import Daimond from "airbnb/svg/daimond";
import React, { useState, useEffect } from "react";
import { BsFillFlagFill } from "react-icons/bs";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import { ClockLoader } from "react-spinners";
import { getActiveTrips } from "airbnb/lib/lisitng";

import useAverageRating from "airbnb/hooks/useAverageRating";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Calender from "airbnb/components/common/Calender";

import { IoIosCalendar } from "react-icons/io";
import { IoPersonAddOutline, IoCloseCircle } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";

import { BeatLoader } from "react-spinners";

export default function TripScheduler({ t }) {
  const router = useRouter();
  const { currentListing, userInfo } = userAppStore();
  const rating = useAverageRating(currentListing?.reviews);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [guests, setGuests] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeTripData, setActiveTripData] = useState([]);
  const [desabledDateArray, setDesabledDateArray] = useState([]);

  const calculateDaysDifference = () => {
    const startDate = new Date(state[0].startDate);
    const endDate = new Date(state[0].endDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getActiveTrips(currentListing.id);
      setActiveTripData(...activeTripData, data);
      setLoading(false);
    };
    if (userInfo) {
      getData();
    }
  }, []);

  const getDates = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = new Date(startDate.split("T")[0].replace(/-/g, "/"));
      const end = new Date(endDate.split("T")[0].replace(/-/g, "/")) - 1;

      const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
      setDesabledDateArray((prevDateArray) => {
        const newDates = [...prevDateArray];
        for (let i = 0; i <= days; i++) {
          const currentDate = new Date(
            start.getTime() + i * 24 * 60 * 60 * 1000
          );
          newDates.push(currentDate);
        }
        return newDates;
      });
    }
  };

  const showDate = () => {
    if (!showCalendar) {
      activeTripData.forEach((trip) => {
        getDates(trip.tripinfo.startDate, trip.tripinfo.endDate);
      });
    }
    setShowCalendar(true);
  };

  const handleReservation = async () => {
    if (userInfo) {
      const data = {
        listingId: currentListing.id,
        listing: {
          placeSpace: currentListing.placeSpace,
          prestation: currentListing.prestation,
          photos: currentListing.photos,
          tax: currentListing.tax,
          placeType : currentListing.placeType,
          locationType : currentListing.locationType,
          title: currentListing.title,
          region: currentListing.locationData.region,
          reviews: currentListing?.reviews
        },
        userId: userInfo?.id,
        tripData: {
          days: calculateDaysDifference(),
          startDate: state[0].startDate,
          endDate: state[0].endDate,
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
      //}
    }else {
      router.push(`/auth/signin`);
    }
  };

  return (
    <div className="sticky top-0 w-full flex flex-col gap-6 items-center justify-center">
      <div className="flex flex-col items-center gap-2 p-2 px-4 lg:p-4 lg:border lg:border-[#d1d5db] rounded-xl shadow-lg w-full">
        {loading ? (
          <>
            <BeatLoader loading={loading} color="#3b3f5c" size={15} />
          </>
        ) : (
          <>
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-1 font-bold">
                <span className=" text-lg">
                  {userInfo?.typeUser === "B2B"
                    ? currentListing.priceB2b.toFixed(2)
                    : currentListing.price.toFixed(2)}{" "}
                  MAD
                </span>
                <span className="text-base self-end text-[#6e7582]">
                  / {t("page.listing.day")}
                </span>
              </div>
              {rating > 0 && (
                <span className="font-bold flex items-center gap-1">
                  <FaStar color="f97316" size={15} />{" "}
                  <span className="text-sm">{rating.toFixed(1)}</span>
                  <span className="text-sm text-[#99a3b3]">{`(${currentListing?.reviews?.length})`}</span>
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <div className="relative flex items-center gap-3 w-full border-t border-r border-l border-gray-300 p-2 rounded-t-xl cursor-pointer font-bold hover:shadow-lg">
                <IoIosCalendar color="#d1d5db" size={28} />
                <div
                  onClick={() => showDate()}
                  className="flex flex-col gap-1 w-full"
                >
                  <div className="flex items-center gap-3 w-full">
                    <span>
                      {state[0].startDate.toLocaleDateString(undefined, {
                        month: "short",
                        day: "2-digit",
                      })}
                    </span>
                    {" - "}
                    <span>
                      {state[0].endDate.toLocaleDateString(undefined, {
                        month: "short",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 w-full">
                    <label className="text-xs text-[#6e7582]">
                      {t("page.listing.checkin")}
                    </label>
                    <label className="text-xs text-[#6e7582]">-</label>
                    <label className="text-xs text-[#6e7582]">
                      {t("page.listing.checkout")}
                    </label>
                  </div>
                </div>
                {showCalendar && (
                  <div
                    className="flex-1"
                    onClick={() => setShowCalendar(false)}
                  >
                    <IoCloseCircle color="#d1d5db" size={22} />
                  </div>
                )}
                {showCalendar && (
                  <div className="absolute right-0 top-16 shadow-lg rounded-lg">
                    <Calender
                      state={state}
                      setState={setState}
                      disabledDates={desabledDateArray}
                      months={1}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 w-full border border-gray-300 p-2 rounded-b-xl cursor-pointer font-bold hover:shadow-lg">
                <IoPersonAddOutline color="#d1d5db" size={28} />
                <div className="flex flex-col gap-1 w-full">
                  <span>
                    {guests} {t("page.listing.guests")}
                  </span>
                  <input
                    type="number"
                    className="w-full text-xs px-1 py-1 border-none outline-none"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <span className="text-center w-full font-bold text-[#6e7582]">
              {t("page.listing.label")}
            </span>
            <div className="flex justify-between w-full text-sm text-[#6e7582]">
              <span>
                {userInfo?.typeUser === "B2B"
                  ? currentListing.priceB2b.toFixed(2)
                  : currentListing.price.toFixed(2)}{" "}
                MAD x {calculateDaysDifference()} {t("page.listing.days")}
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
            <div className="flex  justify-between w-full text-sm pb-4 border-b border-[#d1d5db] text-[#6e7582]">
              <span>{t("page.listing.vat")}</span>
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
            <div className="flex  justify-between w-full font-bold">
              <span>Total</span>
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
            <button
              className="bg-airbnb-gradient py-3 mt-5  px-5 flex flex-row justify-center items-center gap-3 text-white text-base font-bold rounded-full cursor-pointer w-full"
              onClick={handleReservation}
              //onClick={() => router.push(`/reservation/${currentListing.id}`)}
              disabled={
                loading ||
                (guests > currentListing.placeSpace.guests ? true : false)
              }
            >
              <ClockLoader color="#fbfffe" loading={loading} size={25} />{" "}
              {t("button.reserve")}
            </button>
          </>
        )}
      </div>
      <div className="flex border border-gray-400 rounded-lg p-4 gap-2 items-start px-8">
        <span>
          <strong>{t("page.listing.rare")} </strong>
          {t("page.listing.fully_booked")}
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
