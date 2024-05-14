"use client";
import ListingCreated from "airbnb/components/process/ListingCreated";
import ListingTypeSelector from "airbnb/components/process/ListingTypeSelector";
import Overview from "airbnb/components/process/Overview";
import Photos from "airbnb/components/process/Photos";
import PlaceDetails from "airbnb/components/process/PlaceDetails";
import PlaceLocation from "airbnb/components/process/PlaceLocation";
import ProcessAmeneties from "airbnb/components/process/ProcessAmeneties";
import StepOneStarter from "airbnb/components/process/StepOneStarter";
import StepTwoStarter from "airbnb/components/process/StepTwoStarter";
import Conditions from "airbnb/components/process/Conditions";
import Title from "airbnb/components/process/Title";
import { userAppStore } from "airbnb/store/store";
import AirBnbLogoShort from "airbnb/svg/airbnb-logo-short";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import { getListing } from "airbnb/lib/lisitng";
import { useTranslation } from "react-i18next";

import "airbnb/styles/tailwind.css";

function Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);

  const {
    resetNewListingData,
    currentListing,
    setCurrentListing,
    setLocationType,
    setMapData,
    setLocationData,
    setPlaceAmenities,
    setPhotos,
    setTitle,
    setDescription,
    setPrice,
    setTax,
    setPriceB2b,
    setGuests,
    setConditions,
  } = userAppStore();

  const [listingId, setListingId] = useState("");

  useEffect(() => {
    resetNewListingData();
    setListingId(searchParams.get("listingId"));
  }, [resetNewListingData]);

  useEffect(() => {
    const getData = async () => {
      const data = await getListing(listingId);
      setCurrentListing(data);
      setLocationType(data?.locationType);
      setMapData(data?.mapData);
      setLocationData(data?.locationData);
      setPlaceAmenities(data?.placeAmeneties);
      setPhotos(data?.photos);
      setTitle(data?.title);
      setDescription(data?.description);
      setPrice(data?.price);
      setTax(parseInt(data?.tax));
      setPriceB2b(data?.priceB2b);
      setGuests(data?.guests);
      setConditions(data?.conditions);
      console.log(data);
    };
    if (listingId) getData();
  }, [listingId, setCurrentListing]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const getComponent = () => {
    switch (step) {
      case 1:
        return <Overview t={t} />;
      case 2:
        return <StepOneStarter t={t} />;
      case 3:
        return <ListingTypeSelector t={t} />;
      case 4:
        return <PlaceLocation t={t} />;
      case 5:
        return <PlaceDetails t={t} />;
      case 6:
        return <StepTwoStarter t={t} />;
      case 7:
        return <ProcessAmeneties t={t} />;
      case 8:
        return <Photos t={t} />;
      case 9:
        return <Conditions t={t} />;
      case 10:
        return <Title t={t} />;
      case 11:
        return <ListingCreated listingId={listingId} t={t} />;
      default:
        return <></>;
    }
  };

  return (
    <div className="max-h-[100vh] h-[100vh] space-y-3">
      <header className="flex items-center px-10 lg:px-20 justify-between">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <AirBnbLogoShort />
        </div>
        {/*step <= 9 && (
          <button className="border border-gray-300 text-xs lg:text-base px-5 py-2 rounded-full font-semibold hover:border-gray-700 cursor-pointer">
            Save & exit
          </button>
        )*/}
      </header>
      <div className="flex gap-2 items-end font-bold mx-4 md:mx-[150px] lg:mx-[200px] 2lg:mx-[350px] xl:mx-[400px]">
        <span className="font-extrabold text-4xl text-[#3b3f5c]">{step}</span>
        <span>/ 10</span>
      </div>
      <div className="flex justify-center items-center mx-4 md:mx-[150px] lg:mx-[200px] 2lg:mx-[350px] xl:mx-[400px] border border-[#e0e6ed] shadow-lg rounded-lg ">
        {getComponent()}
      </div>
      <div className="flex justify-end items-center gap-5 mx-4 md:mx-[150px] lg:mx-[200px] 2lg:mx-[350px] xl:mx-[400px]  ">
        {step >= 2 && step <= 9 ? (
          <button
            onClick={handlePrevious}
            className="btn btn-primary rounded-3xl font-bold"
          >
            {t("page.new_listing.back")}
          </button>
        ) : null}
        {step === 9 ? (
          <button
            onClick={handleNext}
            className="btn btn-primary rounded-3xl font-bold"
          >
            {listingId !== "" && listingId !== null
              ? `${t("page.new_listing.update_hall")}`
              : `${t("page.new_listing.add_hall")}`}
          </button>
        ) : (
          step <= 8 && (
            <button
              onClick={handleNext}
              className="btn btn-primary rounded-3xl font-bold"
            >
              {t("page.new_listing.continue")}
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
