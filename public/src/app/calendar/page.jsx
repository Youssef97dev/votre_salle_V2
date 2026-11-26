"use client";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});
import { addDays } from "date-fns";

import { userAppStore } from "airbnb/store/store";
import React, { useEffect, useState, Fragment } from "react";
import { getUserReservedTrips, getUserListings } from "airbnb/lib/lisitng";
import dynamic from "next/dynamic";

import StopSales from "./components/StopSales";

import "@bitnoi.se/react-scheduler/dist/style.css";
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";

const page = () => {
  const {
    isAuthModalOpen,
    userInfo,
    setUserListings,
    userListings,
    setRelaunchTrips,
    relaunchTrips,
  } = userAppStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [isClient, setIsClient] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddEventModal, setIsAddEventModal] = useState(false);
  const [singleListing, setSingleListing] = useState({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await getUserListings(userInfo?.id);
      setUserListings(data);
      setIsLoading(false);
      console.log("hi");
    };
    if (userInfo) {
      getData();
    }
  }, [userInfo, relaunchTrips, setRelaunchTrips]);

  useEffect(() => {
    const newData = userListings.map((listing) => ({
      id: listing.id,
      label: {
        icon: listing.photos[0],
        title: listing.title,
        subtitle: "Click for Stop sales",
        trips: listing.trips,
      },
      data: listing.trips.map((trip) => ({
        id: trip.id,
        trips: listing.trips,
        startDate: trip.tripinfo.startDate,
        endDate: addDays(new Date(trip.tripinfo.endDate), -1),
        occupancy: 1800,
        title:
          trip.tripinfo.type === "reservation"
            ? `${trip.user.firstName} ${trip.user.lastName}`
            : trip.tripinfo.type,
        subtitle: "",
        description: trip.tripinfo?.description && trip.tripinfo.description,
        bgColor: `${
          trip.tripinfo.type === "reservation" ? "#4361ee" : "#e7515a"
        }`,
      })),
    }));
    console.log(newData);
    setScheduleData(() => [...newData]);
  }, [userListings]);

  const openModalStopSales = (item) => {
    console.log(item);
    setSingleListing(item);
    setIsAddEventModal(true);
  };

  return (
    isClient && (
      <>
        {/* Header */}
        <Navbar />

        {/* Content */}
        {/*<div className="mb-5 p-3">
          <Tab.Group>
            <div className="mx-10 mb-5 sm:mb-0 flex flex-col gap-4">
              <Tab.List className="flex w-full flex-row justify-end items-center gap-3">
                {userListings.map((listing, index) => (
                  <Tab as={Fragment} key={index}>
                    {({ selected }) => (
                      <div className="text-center !outline-none border border-blue-950 rounded-lg">
                        <button
                          className={`${
                            selected
                              ? "!bg-blue-950 text-white !outline-none"
                              : ""
                          } block rounded-lg p-3.5 py-2 transition-all duration-300 hover:bg-blue-950 hover:text-white w-full text-left`}
                        >
                          {listing.title}
                        </button>
                      </div>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="w-full">
                {userListings.map((listing, index) => (
                  <Tab.Panel key={index}>
                    <div className="active">
                      <BigCalendar listing={listing} />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>*/}
        <div className="panel h-[80vh]">
          <Scheduler
            data={scheduleData}
            isLoading={isLoading}
            onTileClick={(item) =>
              item?.title === "Stop sales" && openModalStopSales(item)
            }
            onItemClick={(item) => openModalStopSales(item)}
            config={{
              zoom: 1,
              filterButtonState: -1,
              includeTakenHoursOnWeekendsInDayView: false,
            }}
          />
        </div>
        {isAddEventModal && (
          <StopSales
            isAddEventModal={isAddEventModal}
            setIsAddEventModal={setIsAddEventModal}
            listing={singleListing}
          />
        )}

        {/* Footer */}
        <CompactFooter />

        {!isDesktop && <NavbarMobile />}
      </>
    )
  );
};

export default page;
