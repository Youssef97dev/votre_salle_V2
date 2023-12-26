import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Map from "react-map-gl";
import GeocoderControl from "./geocoder-control";
import { userAppStore } from "airbnb/store/store";

const TOKEN =
  "pk.eyJ1IjoieW91bmVzYWl0IiwiYSI6ImNsbnU3ODZ6czBhdXgyam5zNHZleDl1d2cifQ.Omdr-w7Yx9kNjkltlzunKg";

export default function PlaceLocation() {
  const { setMapData, mapData, setLocationData } = userAppStore();
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
      tour:"",
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

  /*const mapStyles = {
    height: '400px',
    width: '100%'
  };

  const defaultCenter = {
    lat: mapData !== undefined ? mapData?.longitude : -8.008889,
    lng: mapData !== undefined ? mapData?.latitude : 31.63,
  };*/ // Default center coordinates
  return (
    <div className="flex flex-col gap-6 p-6 w-full h-full rounded-lg">
      <h2 className="font-extrabold text-2xl pb-5 border-b border-[#dbdcdf] w-fit">
        Choose your location
      </h2>
      <div className="w-full h-full rounded-lg">
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
        {/*<LoadScript googleMapsApiKey="AIzaSyBFcCNJN6OyB-NIy-fNTO5lQ1KVx2TCGQ4">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          >
            <Marker position={defaultCenter} />
          </GoogleMap>
      </LoadScript>*/}
      </div>
    </div>
  );
}
