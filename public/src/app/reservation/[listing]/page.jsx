"use client";
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import { userAppStore } from "airbnb/store/store";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import { getActiveTrips, addTrip, addToNotification } from "airbnb/lib/lisitng";
import { useRouter, useSearchParams } from "next/navigation";
import Daimond from "airbnb/svg/daimond";
import Image from "next/image";
import AnimateHeight from "react-animate-height";
import { addDays } from "date-fns";
import { DotLoader } from "react-spinners";
import Spinner from "airbnb/components/common/Spinner";

import AirBnbLogoShort from "airbnb/svg/airbnb-logo-short";
import { AiOutlineLeftCircle } from "react-icons/ai";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Calender from "airbnb/components/common/Calender";

const page = ({ params: { listing } }) => {
  // Routing & Queries
  const router = useRouter();
  const searchParams = useSearchParams();

  // current user
  const { userInfo } = userAppStore();

  // current reservation state
  const [reservationData, setReservationData] = useState(
    JSON.parse(searchParams.get("data"))
  );

  // loading
  const [loading, setLoading] = useState(true);

  // Popups and Accordion state
  const [guestsPopup, setGuestsPopup] = useState(false);
  const [datePopup, setDatePopup] = useState(false);
  const [active, setActive] = useState("1");

  // All Reservations
  const [activeTripData, setActiveTripData] = useState([]);
  const [dateState, setDateState] = useState([
    {
      startDate: addDays(new Date(reservationData.tripData.startDate), -1),
      endDate: addDays(new Date(reservationData.tripData.endDate), -1),
      key: "selection",
    },
  ]);

  // current guest numbers and dates reservation
  const [guestsNumber, setGuestsNumber] = useState(
    reservationData.tripData.guests
  );

  // current extraServices
  const [selectedPoses, setSelectedPoses] = useState([]);

  // already reserved dates
  const [dateArray, setDateArray] = useState([]);

  useEffect(()=>{
    console.log("date state:", dateState);
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await getActiveTrips(reservationData.listingId);
      setActiveTripData(...activeTripData, data);
    };
    if (userInfo) {
      getData(); 
      console.log("start date :", reservationData.tripData.startDate)
      console.log("end date :", reservationData.tripData.endDate)
    }
  }, []);

  const calculateDaysDifference = () => {
    const startDate = new Date(dateState[0].startDate);
    const endDate = new Date(dateState[0].endDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  const getDates = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = new Date(startDate.split("T")[0].replace(/-/g, "/"));
      const end = new Date(endDate.split("T")[0].replace(/-/g, "/")) - 1;
      const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
      setDateArray((prevDateArray) => {
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

  const togglePara = (value) => {
    setActive((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  const handlePose = (pose) => {
    const selectedPosesByType = {}; // Object to store selected poses by type

    // Initialize selectedPosesByType with an empty array for each type
    selectedPoses.forEach((selectedPose) => {
      const type = selectedPose.type;
      if (!selectedPosesByType[type]) {
        selectedPosesByType[type] = [];
      }
      selectedPosesByType[type].push(selectedPose);
    });

    const isPoseSelected = selectedPoses.includes(pose);
    const extraServices =
      parseFloat(pose.price) * reservationData.tripData.guests;

    let newListingPrice = parseFloat(reservationData.tripData.listingPrice);

    // Adjust newListingPrice based on the selected poses of the same type
    if (isPoseSelected) {
      newListingPrice -= extraServices;
    } else {
      const prevPosesOfType = selectedPosesByType[pose.type] || [];
      const prevPosesPrice = prevPosesOfType.reduce(
        (total, prevPose) => total + parseFloat(prevPose.price),
        0
      );
      newListingPrice =
        newListingPrice -
        prevPosesPrice * reservationData.tripData.guests +
        extraServices;
    }

    const { newPriceHT, newTaxPrice, newTotal } =
      calculationPrice(newListingPrice);

    const updatedReservationData = {
      ...reservationData,
      tripData: {
        ...reservationData.tripData,
        listingPrice: newListingPrice.toFixed(2),
        priceHT: newPriceHT,
        tax: newTaxPrice,
        extraService: isPoseSelected
          ? reservationData.tripData.extraService - extraServices
          : extraServices,
        price: newTotal,
      },
    };

    // Update selectedPosesByType for the current pose type
    const updatedSelectedPosesByType = {
      ...selectedPosesByType,
      [pose.type]: isPoseSelected
        ? selectedPosesByType[pose.type].filter((p) => p !== pose)
        : [pose],
    };

    // Flatten the updatedSelectedPosesByType to get the final selectedPoses array
    const updatedSelectedPoses = Object.values(
      updatedSelectedPosesByType
    ).flat();

    setSelectedPoses(updatedSelectedPoses);
    setReservationData(updatedReservationData);
  };

  const calculationPrice = (priceListing) => {
    const newPriceHT = parseFloat(
      parseFloat(priceListing) * reservationData.tripData.days
    ).toFixed(2);
    const newTaxPrice = parseFloat(
      newPriceHT * (reservationData.listing.tax / 100)
    ).toFixed(2);
    const newTotal = parseFloat(
      parseFloat(newTaxPrice) + parseFloat(newPriceHT)
    ).toFixed(2);

    return { newPriceHT, newTaxPrice, newTotal };
  };

  const handleUpdateGuestsNumber = () => {
    setReservationData({
      ...reservationData,
      tripData: {
        ...reservationData.tripData,
        guests: guestsNumber,
      },
    });

    setGuestsPopup(false);
  };

  const handleUpdateTripDate = async () => {
    const days = await calculateDaysDifference();
    const startDate = dateState[0].startDate;
    const endDate = dateState[0].endDate;
    const priceHT = parseFloat(
      reservationData.tripData.listingPrice * days
    ).toFixed(2);
    const tax = parseFloat(
      priceHT * (reservationData.listing.tax / 100)
    ).toFixed(2);
    const price = parseFloat(parseFloat(priceHT) + parseFloat(tax)).toFixed(2);

    setReservationData({
      ...reservationData,
      tripData: {
        ...reservationData.tripData,
        startDate,
        endDate,
        days,
        priceHT,
        tax,
        price,
      },
    });
    setDatePopup(false);
  };

  const showDatePopup = () => {
    activeTripData.forEach((trip) => {
      getDates(trip.tripinfo.startDate, trip.tripinfo.endDate);
    });
    setDatePopup(true);
  };

  const handleReservationSubmit = async () => {
    const data = {
      listingId: reservationData.listingId,
      userId: userInfo?.id,
      tripData: {
        days: reservationData.tripData.days,
        startDate: addDays(new Date(dateState[0].startDate), 1),
        endDate: addDays(new Date(dateState[0].endDate), 1),
        guests: reservationData.tripData.guests,
        extraServices: "",
        extraServicesPrice: reservationData.tripData.extraService,
        listingPrice: reservationData.tripData.listingPrice,
        tax: reservationData.listing.tax,
        taxPrice: reservationData.tripData.tax,
        priceHT: reservationData.tripData.priceHT,
        price: reservationData.tripData.price,
        description: "",
        type: "reservation",
      },
    };

    const response = await addTrip(data);
    if (response) {
      await addToNotification(`${userInfo?.firstName} ${userInfo?.lastName}`, `Make a reservation at ${reservationData?.listing?.title}`, false, reservationData?.listing?.listingCreatedBy?.id);
      router.push("/trips");
    }
  };

  return (
    <div className="grid sm:grid-rows-new-reservation grid-rows-new-reservation-mobile md:h-[150vh] h-[170vh]">
      {/* Header */}
      <div className="pl-5 cursor-pointer" onClick={() => router.push("/")}>
        <AirBnbLogoShort />
      </div>

      {/* Label */}
      <div className="flex items-center gap-2 md:px-48 sm:px-20 px-5">
        <AiOutlineLeftCircle size={20} />
        <span className="font-semibold text-3xl">Confirm and pay</span>
      </div>

      {/* Content */}
      <div className="flex md:flex-row flex-col gap-5 md:gap-16 md:px-48 sm:px-20 px-5 w-full h-full">
        {/* Left Side  */}
        <div className="flex flex-col gap-2 w-full h-full ">
          <div className="flex border border-[#d3d3d3] rounded-lg p-4 gap-2 justify-between items-center ">
            <span>
              <strong>This is a rare find. </strong>
              <br />
              {/*currentListing?.listingCreatedBy?.firstName*/}Youssef's place
              on Votre Salle is usually fully booked.
            </span>
            <Daimond />
          </div>
          <div className="flex flex-col gap-4 border-b border-[#d3d3d3] py-4 px-2">
            <span className="font-semibold text-lg">Your Hall</span>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium">Dates</span>
                <span className="text-sm text-gray-500">
                  {
                    new Date(reservationData.tripData.startDate).toLocaleDateString(undefined, {
                      month: "short",
                      day: "2-digit",
                    })}
                  {" - "}
                  {
                    new Date(reservationData.tripData.endDate).toLocaleDateString(undefined, {
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              </div>
              <span
                onClick={() => showDatePopup()}
                className="underline cursor-pointer"
              >
                Update
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium">guests</span>
                <span className="text-sm text-gray-500">
                  {reservationData.tripData.guests} guests
                </span>
              </div>
              <span
                onClick={() => setGuestsPopup(true)}
                className="underline cursor-pointer"
              >
                Update
              </span>
            </div>
          </div>

          {/* Extra Services */}
          {reservationData.listing.prestation && (
            <div className="flex flex-col gap-4 border-b border-[#d3d3d3] py-4 px-2">
              <span className="font-semibold text-lg">Extra Services</span>
              {reservationData.listing.prestation.poseCafe.length > 0 && (
                <div className="border border-[#d3d3d3] rounded-lg shadow-lg">
                  <button
                    type="button"
                    className={`p-3 w-full flex items-center ${
                      active === "1" ? "text-slate-600" : "text-[#000]"
                    }`}
                    onClick={() => {
                      togglePara("1");
                    }}
                  >
                    Pose Café
                    <div
                      className={`ml-auto ${
                        active === "1" ? "rotate-180" : ""
                      } `}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={20}
                        height={20}
                      >
                        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                        <path d="M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z" />
                      </svg>
                    </div>
                  </button>
                  <div>
                    <AnimateHeight
                      duration={300}
                      height={active === "1" ? "auto" : 0}
                    >
                      <div className="p-2 text-white-dark border-t border-[#d3d3d3] gap-2 flex flex-col">
                        {reservationData.listing.prestation?.poseCafe.map(
                          (pose, index) => (
                            <div
                              onClick={() => handlePose(pose)}
                              className={`flex gap-4 justify-between items-center border border-[#d3d3d3] rounded-lg py-1 px-2 cursor-pointer ${
                                selectedPoses.includes(pose)
                                  ? "bg-slate-500"
                                  : ""
                              }`}
                              key={index}
                            >
                              <p>{pose.description}</p>
                              <span>{parseFloat(pose.price).toFixed(2)}</span>
                            </div>
                          )
                        )}
                      </div>
                    </AnimateHeight>
                  </div>
                </div>
              )}

              {reservationData.listing.prestation.poseDejeunner.length > 0 && (
                <div className="border border-[#d3d3d3] rounded-lg shadow-lg">
                  <button
                    type="button"
                    className={`p-3 w-full flex items-center ${
                      active === "2" ? "text-slate-600" : "text-[#000]"
                    }`}
                    onClick={() => {
                      togglePara("2");
                    }}
                  >
                    Déjeunner
                    <div
                      className={`ml-auto ${
                        active === "2" ? "rotate-180" : ""
                      } `}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={20}
                        height={20}
                      >
                        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                        <path d="M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z" />
                      </svg>
                    </div>
                  </button>
                  <div>
                    <AnimateHeight
                      duration={300}
                      height={active === "2" ? "auto" : 0}
                    >
                      <div className="p-2 text-white-dark border-t border-[#d3d3d3] gap-2 flex flex-col">
                        {reservationData.listing.prestation?.poseDejeunner.map(
                          (pose, index) => (
                            <div
                              onClick={() => handlePose(pose)}
                              className={`flex gap-4 justify-between items-center border border-[#d3d3d3] rounded-lg py-1 px-2 cursor-pointer ${
                                selectedPoses.includes(pose)
                                  ? "bg-slate-500"
                                  : ""
                              }`}
                              key={index}
                            >
                              <p>{pose.description}</p>
                              <span>{parseFloat(pose.price).toFixed(2)}</span>
                            </div>
                          )
                        )}
                      </div>
                    </AnimateHeight>
                  </div>
                </div>
              )}

              {reservationData.listing.prestation.poseDinner.length > 0 && (
                <div className="border border-[#d3d3d3] rounded-lg shadow-lg">
                  <button
                    type="button"
                    className={`p-3 w-full flex items-center ${
                      active === "3" ? "text-slate-600" : "text-[#000]"
                    }`}
                    onClick={() => {
                      togglePara("3");
                    }}
                  >
                    Déjeunner
                    <div
                      className={`ml-auto ${
                        active === "3" ? "rotate-180" : ""
                      } `}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={20}
                        height={20}
                      >
                        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                        <path d="M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z" />
                      </svg>
                    </div>
                  </button>
                  <div>
                    <AnimateHeight
                      duration={300}
                      height={active === "3" ? "auto" : 0}
                    >
                      <div className="p-2 text-white-dark border-t border-[#d3d3d3] gap-2 flex flex-col">
                        {reservationData.listing.prestation?.poseDinner.map(
                          (pose, index) => (
                            <div
                              onClick={() => handlePose(pose)}
                              className={`flex gap-4 justify-between items-center border border-[#d3d3d3] rounded-lg py-1 px-2 cursor-pointer ${
                                selectedPoses.includes(pose)
                                  ? "bg-slate-500"
                                  : ""
                              }`}
                              key={index}
                            >
                              <p>{pose.description}</p>
                              <span>{parseFloat(pose.price).toFixed(2)}</span>
                            </div>
                          )
                        )}
                      </div>
                    </AnimateHeight>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-2  w-full h-full">
          <div className="flex flex-col gap-2 border border-[#d3d3d3] rounded-lg p-5">
            <div className="flex gap-3 border-b border-[#d3d3d3] pb-4 ">
              <div className="relative w-24 h-24">
                <Image
                  alt="listing"
                  fill
                  src={reservationData.listing.photos[0]}
                  className="rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-1 p-1">
                <span className="font-medium text-xs">
                  {reservationData.listing.placeType} :{" "}
                  {reservationData.listing.locationType}
                </span>
                <span className="font-medium text-sm flex-grow">
                  {reservationData.listing.title} :{" "}
                  {reservationData.listing.locationData.region}
                </span>
                <span className="font-medium text-xs">
                  &#9733; 4,81{" "}
                  <span className="text-gray-500">(42 commentaires)</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4 border-b border-[#d3d3d3] pb-4 ">
              <span className="font-semibold text-lg mb-2">Price details</span>
              <div className="flex justify-between text-gray-500 text-sm gap-2">
                <span>
                  {reservationData.tripData.listingPrice} MAD x{" "}
                  {reservationData.tripData.days} days
                </span>
                <span>{reservationData.tripData.priceHT} MAD</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm gap-2">
                <span>TVA {reservationData.listing.tax} %</span>
                <span>{reservationData.tripData.tax} MAD</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm gap-2">
                <span>Extra services</span>
                <span>{reservationData.tripData.extraService} MAD</span>
              </div>
            </div>
            <div className="flex pt-4 gap-2 text-sm justify-between">
              <span>Total (MAD)</span>
              <span>{reservationData.tripData.price} MAD</span>
            </div>
          </div>
          <button
            onClick={() => handleReservationSubmit()}
            className="flex flex-row gap-2 w-full text-center items-center justify-center py-3 bg-slate-600 mt-5  px-5 text-white text-base font-medium rounded-md cursor-pointer"
          >
            reserver
          </button>
        </div>
      </div>

      {/* Footer */}
      <CompactFooter />

      {/* Guests popup */}
      {guestsPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
          <div className="relative h-fit w-[30%] rounded-lg  bg-[#F7F7F7] px-2 py-5 overflow-hidden">
            <div className="w-full h-full overflow-auto pb-8">
              <div className="mb-5">
                <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-lg cursor-pointer">
                  <label className="font-semibold text-xs">GUESTS</label>
                  <input
                    type="number"
                    className="text-sm px-1 py-1 border-none outline-none"
                    value={guestsNumber}
                    onChange={(e) => setGuestsNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="absolute flex flex-row font-medium text-white shadow-2xl px-1 py-2 bg-white gap-2 justify-between bottom-0 left-0 border border-[#d3d3d3] w-full h-16">
              <button
                onClick={() => setGuestsPopup(false)}
                className="w-full rounded-xl bg-orange-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateGuestsNumber()}
                className="w-full rounded-xl bg-sky-900"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Date popup */}
      {datePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
          <div className="relative h-fit w-fit rounded-lg  bg-[#F7F7F7] px-2 py-5 overflow-hidden">
            <div className="w-full h-full overflow-auto pb-8">
              <div className="mb-5">
                <Calender
                  state={dateState}
                  setState={setDateState}
                  disabledDates={dateArray}
                />
              </div>
            </div>
            <div className="absolute flex flex-row font-medium text-white shadow-2xl px-1 py-2 bg-white gap-2 justify-between bottom-0 right-0 w-[50%] h-16">
              <button
                onClick={() => setDatePopup(false)}
                className="w-full rounded-xl bg-orange-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateTripDate()}
                className="w-full rounded-xl bg-sky-900"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
