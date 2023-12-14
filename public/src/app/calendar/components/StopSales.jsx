import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import { userAppStore } from "airbnb/store/store";
import {
  addTrip,
  deleteTripAPI,
  updateTrip,
  getActiveTrips,
} from "airbnb/lib/lisitng";
import { BeatLoader } from "react-spinners";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Calender from "airbnb/components/common/Calender";

const StopSales = ({ isAddEventModal, setIsAddEventModal, listing }) => {
  const { isAuthModalOpen, userInfo, reservations, setRelaunchTrips } =
    userAppStore();
  const defaultParams = {
    id: listing?.title === "Stop sales" ? listing?.id : null,
    description: listing?.description || "",
  };
  const [params, setParams] = useState(defaultParams);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeTripData, setActiveTripData] = useState([]);
  const [desabledDateArray, setDesabledDateArray] = useState([]);

  const [dateState, setDateState] = useState([
    {
      startDate: listing?.startDate ? new Date(listing?.startDate) : null,
      endDate: listing?.endDate ? new Date(listing?.endDate) : null,
      key: "selection",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const activeTrips =
        params?.id !== null
          ? await listing.trips.filter(
              (trip) =>
                trip.status === "Active" &&
                trip.tripinfo.startDate !== listing.startDate &&
                trip.tripinfo.endDate !== listing.endDate
            )
          : await listing.label.trips.filter(
              (trip) => trip.status === "Active"
            );
      setActiveTripData(...activeTripData, activeTrips);
    };
    if (userInfo) {
      getData();
    }
  }, []);

  const getDates = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = new Date(startDate.split("T")[0].replace(/-/g, "/"));
      const end = new Date(endDate.split("T")[0].replace(/-/g, "/")) - 1;
      const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
      setDesabledDateArray((prevDateArray) => {
        const newDates = [...prevDateArray];

        for (let i = 0; i <= days; i++) {
          const currentDate = new Date(
            start.getTime() + i * 24 * 60 * 60 * 1000
          );
          newDates.push(currentDate);
        }
        console.log(newDates);
        return newDates;
      });
    }
  };

  const showDate = async () => {
    await activeTripData.forEach((trip) => {
      getDates(trip.tripinfo.startDate, trip.tripinfo.endDate);
    });
    setShowCalendar((prev) => !prev);
  };

  const changeValue = (e) => {
    const { value, id } = e.target;
    setParams({ ...params, [id]: value });
  };

  const handleStopReservation = async (event) => {
    const data = {
      listingId: listing.id,
      userId: userInfo?.id,
      tripData: {
        startDate: event.start,
        endDate: event.end,
        description: event.description,
        type: "Stop sales",
      },
      status: "Active",
    };

    try {
      const response = await addTrip(data);
      return response;
    } catch (error) {
      return error;
    }
  };

  const handleUpdateStopReservation = async (event) => {
    const data = {
      tripData: {
        startDate: event.start,
        endDate: event.end,
        description: event.description,
        type: "Stop sales",
      },
      status: "Active",
    };

    try {
      const response = await updateTrip(params.id, data);
      return response;
    } catch (error) {
      return error;
    }
  };

  const saveEvent = async () => {
    setIsUpdateLoading(true);
    if (!dateState[0]?.startDate || !dateState[0]?.endDate) {
      return true;
    }
    //add event
    let event = {
      start: dateState[0]?.startDate,
      end: dateState[0]?.endDate,
      description: params.description,
    };
    if (params?.id) {
      const response = await handleUpdateStopReservation(event);
      if (response.status === 200) {
        showMessage("Stop reservation has been updated.");
        setIsUpdateLoading(false);
      }
    } else {
      const response = await handleStopReservation(event);
      console.log("response", response);
      if (response.status === 201) {
        showMessage("Reservation has been stoped.");
        setIsUpdateLoading(false);
      }
    }
    setRelaunchTrips();
    setIsAddEventModal(false);
  };

  const deleteEvent = async (id) => {
    setIsDeleteLoading(true);
    const response = await deleteTripAPI(id);
    if (response?.status === 200) {
      showMessage("Reservation has been deleted.");
      setRelaunchTrips();
      setIsDeleteLoading(false);
    }
    setIsAddEventModal(false);
  };

  const showMessage = (msg = "", type = "success") => {
    const toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      customClass: { container: "toast" },
    });
    toast.fire({
      icon: type,
      title: msg,
      padding: "10px 20px",
    });
  };

  return (
    <Transition appear show={isAddEventModal} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setIsAddEventModal(false)}
        open={isAddEventModal}
        className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-[black]/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <Transition.Child
              as={Fragment}
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`panel w-full overflow-hidden rounded-lg border-0 p-0 text-black max-w-5xl`}
              >
                <button
                  type="button"
                  className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 right-4"
                  onClick={() => setIsAddEventModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div className="bg-[#fbfbfb] py-3 text-lg font-medium pl-5 pr-[50px]">
                  {params.id ? "Edit Event" : "Add Event"}
                </div>
                <div className="p-5">
                  <form className="space-y-5">
                    <div className="space-y-5" onClick={() => showDate()}>
                      <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-tl-md  cursor-pointer">
                        <label className="font-semibold text-xs">From :</label>
                        <span>
                          {dateState[0]?.startDate?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 border border-gray-300 p-2 rounded-tl-md  cursor-pointer">
                        <label className="font-semibold text-xs">To :</label>
                        <span>
                          {dateState[0]?.endDate?.toLocaleDateString()}
                        </span>
                      </div>
                      {showCalendar && (
                        <div className="">
                          <Calender
                            state={dateState}
                            setState={setDateState}
                            disabledDates={desabledDateArray}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="description">Event Description :</label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-textarea min-h-[130px]"
                        placeholder="Enter Event Description"
                        value={params.description || ""}
                        onChange={(e) => changeValue(e)}
                      ></textarea>
                    </div>
                    <div className="!mt-8 flex items-center justify-end">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => setIsAddEventModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEvent()}
                        className="btn btn-primary ml-4"
                        disabled={isDeleteLoading || isUpdateLoading}
                      >
                        {!isUpdateLoading ? (
                          params.id ? (
                            "Update stop sales"
                          ) : (
                            "Stop sales"
                          )
                        ) : (
                          <BeatLoader color="#fff" size={5} />
                        )}
                      </button>
                      {params?.id && (
                        <button
                          type="button"
                          onClick={() => deleteEvent(params.id)}
                          className="btn btn-warning ml-4"
                          disabled={isDeleteLoading || isUpdateLoading}
                        >
                          {!isDeleteLoading ? (
                            "Delete"
                          ) : (
                            <BeatLoader color="#fff" size={5} />
                          )}
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default StopSales;
