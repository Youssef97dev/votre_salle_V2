"use client";
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import { userAppStore } from "airbnb/store/store";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import { getListing } from "airbnb/lib/lisitng";
import { useRouter, useSearchParams } from 'next/navigation';
import Daimond from "airbnb/svg/daimond";
import Image from "next/image";
import AnimateHeight from "react-animate-height";

import AirBnbLogoShort from "airbnb/svg/airbnb-logo-short";
import { AiOutlineLeftCircle } from "react-icons/ai";

const page = ({ params: { listing } }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [reservationData, setReservationData] = useState(JSON.parse(searchParams.get('data')));
    const [active, setActive] = useState("1");
    const [selectedPoses, setSelectedPoses] = useState([]);
    const [prestation, setPrestation] = useState({
        poseCafe: [],
        poseDejeunner: [],
        poseDinner: [],
      });

    const togglePara = (value) => {
        setActive((oldValue) => {
          return oldValue === value ? "" : value;
        });
    };

    const handlePose = (pose) => {
        
        if (selectedPoses.includes(pose)) {
            // Deselect the pose by removing it from the selectedPoses array
            setSelectedPoses(selectedPoses.filter(selectedPose => selectedPose !== pose));
            setReservationData({...reservationData,tripData:{...reservationData.tripData, price: (parseFloat(reservationData.tripData.price) - parseFloat(pose.price)).toFixed(2)}});
          } else {
            // Select the pose by adding it to the selectedPoses array
            setSelectedPoses([...selectedPoses, pose]);
            setReservationData({...reservationData,tripData:{...reservationData.tripData, price: (parseFloat(reservationData.tripData.price) + parseFloat(pose.price)).toFixed(2)}});
          }
    }

   
    useEffect(() => {
        console.log(reservationData);
    }, [])
  return (
    <div className="grid grid-rows-new-reservation h-[150vh]">
        <div className="pl-5 cursor-pointer" onClick={() => router.push("/")}>
          <AirBnbLogoShort />
        </div>
        <div className="flex items-center gap-2 px-5">
            <AiOutlineLeftCircle size={20} />
            <span className="font-semibold text-3xl">Confirm and pay</span>
        </div>
        <div className="flex gap-16 px-40 w-full h-full">
            <div className="flex flex-col gap-2 w-full h-full ">
                <div className="flex border border-[#d3d3d3] rounded-lg p-4 gap-2 justify-between items-center ">
                    <span>
                    <strong>This is a rare find. </strong><br/>
                    {/*currentListing?.listingCreatedBy?.firstName*/}Youssef's place on Votre Salle is
                    usually fully booked.
                    </span>
                    <Daimond />
                </div>
                <div className="flex flex-col gap-4 border-b border-[#d3d3d3] py-4 px-2">
                    <span className="font-semibold text-lg">Your Hall</span>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="font-medium">Dates</span>
                            <span className="text-sm text-gray-500">15-20 nov</span>
                        </div>
                        <span className="underline">Modifier</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="font-medium">guests</span>
                            <span className="text-sm text-gray-500">{reservationData.tripData.guests} guests</span>
                        </div>
                        <span className="underline">Modifier</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4 border-b border-[#d3d3d3] py-4 px-2">
                    <span className="font-semibold text-lg">Extra Services</span>
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
                            className={`ml-auto ${active === "1" ? "rotate-180" : ""} `}
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
                                {reservationData.listing.prestation.poseCafe.map((pose, index) => (
                                    <div onClick={() => handlePose(pose)} className={`flex gap-4 justify-between items-center border border-[#d3d3d3] rounded-lg py-1 px-2 cursor-pointer ${selectedPoses.includes(pose) ? 'bg-slate-500' : ''}`} key={index}>
                                        <p>{pose.description}</p>
                                        <span>{parseFloat(pose.price).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            </AnimateHeight>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full h-full">
                <div className="flex flex-col gap-2 border border-[#d3d3d3] rounded-lg p-5">
                   <div className="flex gap-3 border-b border-[#d3d3d3] pb-4 ">
                    <div className="relative w-24 h-24">
                        <Image alt="listing" fill  src={reservationData.listing.photos[0]} className="rounded-xl" />
                    </div>
                    <div className="flex flex-col gap-1 p-1">
                        <span className="font-medium text-xs">{reservationData.listing.placeType} : {reservationData.listing.locationType}</span>
                        <span className="font-medium text-sm flex-grow">{reservationData.listing.title} : {reservationData.listing.locationData.region}</span>
                        <span className="font-medium text-xs">&#9733; 4,81 <span className="text-gray-500">(42 commentaires)</span></span>
                    </div>
                   </div>
                   <div className="flex flex-col gap-4 border-b border-[#d3d3d3] pb-4 ">
                        <span className="font-semibold text-lg mb-2">Price details</span>
                        <div className="flex justify-between text-gray-500 text-sm gap-2">
                            <span>{reservationData.tripData.listingPrice} MAD x {reservationData.tripData.days} days</span>
                            <span>{reservationData.tripData.priceHT} MAD</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-sm gap-2">
                            <span>TVA {reservationData.listing.tax} %</span>
                            <span>{reservationData.tripData.tax} MAD</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-sm gap-2">
                            <span>Extra services</span>
                            <span>{reservationData.tripData.price} MAD</span>
                        </div>
                   </div>
                   <div className="flex pt-4 gap-2 text-sm justify-between">
                        <span>Total (MAD)</span>
                        <span>{reservationData.tripData.price} MAD</span>
                   </div>
                </div>
            </div>
        </div>
        <CompactFooter />
    </div>
  )
}

export default page