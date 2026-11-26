import Pin from "airbnb/components/common/Pin";
import { userAppStore } from "airbnb/store/store";
import React, { useMemo } from "react";
import Map, { Marker } from "react-map-gl";

const TOKEN =
  "pk.eyJ1IjoieW91bmVzYWl0IiwiYSI6ImNsbnU3ODZ6czBhdXgyam5zNHZleDl1d2cifQ.Omdr-w7Yx9kNjkltlzunKg";

export default function ListingMap() {
  const { currentListing } = userAppStore();
  const pins = useMemo(() => {
    return (
      <Marker
        longitude={currentListing.mapData.longitude}
        latitude={currentListing.mapData.latitude}
      >
        <Pin />
      </Marker>
    );
  }, [currentListing]);
  return (
    <div className="flex flex-col gap-2 w-full p-4 border border-[#d1d5db] rounded-xl shadow-lg mb-4">
      <span className="font-extrabold text-lg md:text-xl pb-3 border-b border-[#dbeafe]">Location</span>
      <div className="h-96 w-full">
        <Map
          initialViewState={{
            longitude: currentListing.mapData.longitude,
            latitude: currentListing.mapData.latitude,
            zoom: 13,
          }}
          scrollZoom={false}
          dragPan={false}
          dragRotate={false}
          doubleClickZoom={false}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={TOKEN}
        >
          {pins}
        </Map>
      </div>
    </div>
  );
}
