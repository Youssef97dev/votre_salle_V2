import useClickOutside from "airbnb/hooks/useClickOutside";
import { userAppStore } from "airbnb/store/store";
import axios from "axios";
import React, { useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import { AiOutlineSearch } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
export default function SearchAddress() {
  const { t } = useTranslation();
  const {
    selectionType,
    setSelectionType,
    searchLocation,
    setSearchLocation,
    setSearchListings,
  } = userAppStore();
  const TOKEN =
    "pk.eyJ1IjoieW91bmVzYWl0IiwiYSI6ImNsbnU3ODZ6czBhdXgyam5zNHZleDl1d2cifQ.Omdr-w7Yx9kNjkltlzunKg";

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const searchAddresses = async (query) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
        {
          params: {
            access_token: TOKEN,

            limit: 5,
            language: "fr-FR", // Specify the language for the results
          },
        }
      );

      const addresses = response.data.features.map((feature) => ({
        address: feature.text,
        latitude: feature.center[1],
        longitude: feature.center[0],
      }));
      setSearchedAddresss(addresses);
    } catch (error) {
      console.error("Error searching addresses:", error);
    }
  };
  const [searchText, setSearchText] = useState("");
  const [searchedAddresss, setSearchedAddresss] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [containerRef] = useClickOutside();

  return (
    <div className="relative">
      <label htmlFor="" className="text-xs font-semibold hidden md:block">
        {t('search.where')}
      </label>
      <span className="absolute left-1 top-3 block md:hidden">
        <AiOutlineSearch size={20} color="#b0b0b0" />
      </span>
      <input
        type="text"
        placeholder={t('search.search_destination')}
        className={`bg-transparent focus:outline-none ${
          !isDesktop && "border border-[#b0b0b0] p-3 pl-6 rounded-xl w-full"
        }`}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          searchAddresses(e.target.value);
        }}
      />
      {selectionType === "where" && searchedAddresss.length > 0 && (
        <div
          className="w-full md:absolute md:w-96 md:left-0 md:h-96 md:top-24 shadow-lg rounded-3xl bg-white md:py-10 md:z-[150]"
          ref={containerRef}
        >
          <ul className="flex gap-0 flex-col">
            {searchedAddresss?.map((address, index) => (
              <li
                key={index}
                className="hover:bg-gray-300 transition-all duration-300 py-2"
                onClick={() => {
                  setSelectedAddress(address);
                  setSearchText(address.address);
                  setSearchedAddresss([]);
                  setSelectionType(undefined);
                  setSearchLocation({ ...searchLocation, address });
                }}
              >
                <div
                  className="px-2 md:px-10 grid md:gap-10 gap-5 items-center justify-start"
                  style={{ gridTemplateColumns: "10fr 90fr" }}
                >
                  <span className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center text-2xl">
                    <MdLocationPin />
                  </span>
                  <span className="truncate">{address.address}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
