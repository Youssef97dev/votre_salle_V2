import React, { useEffect, useRef, useState } from "react";
import Map from "react-map-gl";
import GeocoderControl from "./geocoder-control";
import { userAppStore } from "airbnb/store/store";

const TOKEN =
  "pk.eyJ1IjoieW91bmVzYWl0IiwiYSI6ImNsbnU3ODZ6czBhdXgyam5zNHZleDl1d2cifQ.Omdr-w7Yx9kNjkltlzunKg";

export default function PlaceLocation() {
  const { setMapData, mapData, setLocationData } = userAppStore();
  useEffect(() => {
    console.log(mapData);
  }, []);
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
      tour: "",
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
    <div className="flex flex-col gap-6 p-2 md:p-6 w-full h-full rounded-lg">
      <h2 className="font-extrabold text-2xl pb-5 border-b border-[#dbdcdf] w-fit">
        Choose your location
      </h2>
      <div className="w-full h-96 bg-slate-600 rounded-lg">
        <Map
          initialViewState={{
            longitude: mapData !== undefined ? mapData?.longitude : -8.008889,
            latitude: mapData !== undefined ? mapData?.latitude : 31.63,
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
