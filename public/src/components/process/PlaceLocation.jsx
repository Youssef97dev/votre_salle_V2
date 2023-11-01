import React, { useEffect, useRef, useState } from "react";

import Map from "react-map-gl";
import GeocoderControl from "./geocoder-control";
import { userAppStore } from "airbnb/store/store";

const TOKEN =
  "pk.eyJ1IjoieW91bmVzYWl0IiwiYSI6ImNsbnU3ODZ6czBhdXgyam5zNHZleDl1d2cifQ.Omdr-w7Yx9kNjkltlzunKg";

export default function PlaceLocation() {
  const { setMapData, setLocationData } = userAppStore();
  const getResults = ({ result }) => {
    const [longitude, latitude] = result?.geometry?.coordinates;
    const data = {
      landmark: result.text,
      neighborhood: "",
      postcode: "",
      locality: "",
      place: "",
      district: "",
      region: "",
      country: "",
    };
    result?.context?.forEach((item) => {
      Object.keys(data)?.forEach((key) => {
        if (item?.id?.startsWith(key + ".")) {
          data[key] = item?.text;
        }
      });
    });
    setMapData({ latitude, longitude });
    setLocationData({ ...data });
  };
  return (
    <div className="flex flex-col items-center justify-center h-full mx-2 gap-2 md:gap-5">
      <h2 className="font-semibold text-lg md:text-3xl lg:text-4xl ">
        Which of these best describes your place?
      </h2>
      <p className="text-xs md:text-base">
        Your address is only shared with guests after they’ve made a
        reservation.
      </p>
      <div className="w-full h-full md:h-[400px] md:w-[700px] ">
        <Map
          initialViewState={{
            longitude: -8.008889,
            latitude: 31.630000,
            zoom: 13,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={TOKEN}
        >
          <GeocoderControl
            mapboxAccessToken={TOKEN}
            position="top-left"
            marker={true}
            onLoading={() => {}}
            onResults={() => {}}
            onResult={getResults}
            onError={() => {}}
          />
        </Map>
      </div>
    </div>
  );
}
