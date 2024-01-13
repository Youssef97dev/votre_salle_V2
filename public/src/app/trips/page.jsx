"use client";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import { getUserTrips } from "airbnb/lib/lisitng";
import { userAppStore } from "airbnb/store/store";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});
import { useTranslation } from "react-i18next";

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const { userInfo } = userAppStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [tripData, setTripData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getUserTrips(userInfo?.id);
      setTripData(data);
      console.log({ data });
    };
    if (userInfo) {
      getData();
    }
  }, []);

  function checkDateStatus(inputDate) {
    const currentDate = new Date();
    const providedDate = new Date(inputDate);

    if (providedDate < currentDate) {
      return `${t("page.trips.completed")}`;
    } else if (providedDate > currentDate) {
      return `${t("page.trips.upcoming")}`;
    }
  }

  return (
    <div>
      <Navbar />
      <div className="h-[82.5vh] flex justify-start items-start">
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg w-full m-5 lg:m-20">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
              <tr>
                <th scope="col" className="px-2 md:px-6 py-3 whitespace-nowrap">
                  {t("page.trip.listing_name")}
                </th>
                <th scope="col" className="px-2 md:px-6 py-3 whitespace-nowrap">
                  {t("page.trip.checkin")}
                </th>
                <th scope="col" className="px-2 md:px-6 py-3 whitespace-nowrap">
                  {t("page.trip.checkout")}
                </th>
                <th scope="col" className="px-2 md:px-6 py-3 whitespace-nowrap">
                  {t("page.trip.price")}
                </th>
                <th scope="col" className="px-2 md:px-6 py-3 whitespace-nowrap">
                  {t("page.trip.status")}
                </th>
              </tr>
            </thead>
            <tbody>
              {tripData.map((trip, index) => (
                <tr
                  className="bg-white border-b  hover:bg-gray-100 "
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer"
                    onClick={() => router.push(`/listing/${trip.listing.id}`)}
                  >
                    {trip.listing.title}
                  </th>
                  <td className="px-6 py-4">{trip.tripinfo?.startDate}</td>
                  <td className="px-6 py-4">{trip.tripinfo?.endDate}</td>
                  <td className="px-6 py-4">{trip.tripinfo?.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`${
                        checkDateStatus(trip.tripinfo?.startDate) ===
                        `${t("page.trips.completed")}`
                          ? "bg-green-500"
                          : "bg-airbnb-theme-color"
                      }  text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}
                    >
                      {checkDateStatus(trip.tripinfo?.startDate)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CompactFooter />
      {!isDesktop && <NavbarMobile />}
    </div>
  );
}
