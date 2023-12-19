"use client";
import Description from "airbnb/components/process/Description";
import FloorPlan from "airbnb/components/process/FloorPlan";
import ListingCreated from "airbnb/components/process/ListingCreated";
import ListingPlaceType from "airbnb/components/process/ListingPlaceType";
import ListingTypeSelector from "airbnb/components/process/ListingTypeSelector";
import Overview from "airbnb/components/process/Overview";
import Photos from "airbnb/components/process/Photos";
import PlaceDetails from "airbnb/components/process/PlaceDetails";
import PlaceLocation from "airbnb/components/process/PlaceLocation";
import Price from "airbnb/components/process/Price";
import ProcessAmeneties from "airbnb/components/process/ProcessAmeneties";
import StepOneStarter from "airbnb/components/process/StepOneStarter";
import StepThreeStarter from "airbnb/components/process/StepThreeStarter";
import StepTwoStarter from "airbnb/components/process/StepTwoStarter";
import Title from "airbnb/components/process/Title";
import { userAppStore } from "airbnb/store/store";
import AirBnbLogoShort from "airbnb/svg/airbnb-logo-short";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CompactFooter from "airbnb/components/footer/CompactFooter";

function Page() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const { resetNewListingData } = userAppStore();

  useEffect(() => {
    resetNewListingData();
  }, [resetNewListingData]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const getComponent = () => {
    switch (step) {
      case 1:
        return <Overview />;
      case 2:
        return <StepOneStarter />;
      case 3:
        return <ListingTypeSelector />;
      case 4:
        return <PlaceLocation />;
      case 5:
        return <PlaceDetails />;
      case 6:
        return <StepTwoStarter />;
      case 7:
        return <ProcessAmeneties />;
      case 8:
        return <Photos />;
      case 9:
        return <Title />;
      case 10:
        return <ListingCreated />;
      default:
        return <></>;
    }
  };

  return (
    <div className=" grid grid-rows-new-listing h-[120vh]">
      <header className="flex items-center px-10 lg:px-20 justify-between">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <AirBnbLogoShort />
        </div>
        {step <= 9 && (
          <button className="border border-gray-300 text-xs lg:text-base px-5 py-2 rounded-full font-semibold hover:border-gray-700 cursor-pointer">
            Save & exit
          </button>
        )}
      </header>
      <div className="flex gap-2 items-end font-bold mx-[400px]">
        <span className="font-extrabold text-4xl text-[#3b3f5c]">{step}</span>
        <span>/ 10</span>
      </div>
      <div className="flex justify-center items-center mx-[400px] border border-[#e0e6ed] shadow-lg rounded-lg ">
        {getComponent()}
      </div>
      <div className="flex justify-end items-center gap-5 mx-[400px] ">
        {step >= 2 && step <= 9 ? (
          <button
            onClick={handlePrevious}
            className="btn btn-primary rounded-3xl font-bold"
          >
            Go Back
          </button>
        ) : null}
        {step === 9 ? (
          <button
            onClick={handleNext}
            className="btn btn-primary rounded-3xl font-bold"
          >
            Add Your Hall
          </button>
        ) : (
          step <= 8 && (
            <button
              onClick={handleNext}
              className="btn btn-primary rounded-3xl font-bold"
            >
              Continue
            </button>
          )
        )}
      </div>
      {/* {step <= 13 && ( */}
      <CompactFooter />
      {/* )} */}
    </div>
  );
}

export default Page;
