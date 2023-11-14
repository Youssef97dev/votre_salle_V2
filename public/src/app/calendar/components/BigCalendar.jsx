import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import {
  getUserReservedTrips,
  getCurrentListingTrips,
} from "airbnb/lib/lisitng";
import "../../../styles/fullcalendar.css";
import { userAppStore } from "airbnb/store/store";

const BigCalendar = ({ listing }) => {
  const now = new Date();

  const { isAuthModalOpen, userInfo, reservations, setReservations } =
    userAppStore();

  const [reservationData, setReservationData] = useState([]);
  const [events, setEvents] = useState([]);
  const [isAddEventModal, setIsAddEventModal] = useState(false);
  const [minStartDate, setMinStartDate] = useState("");
  const [minEndDate, setMinEndDate] = useState("");
  const defaultParams = {
    id: null,
    title: "",
    start: "",
    end: "",
    description: "",
    type: "primary",
  };

  useEffect(() => {
    console.log(
      reservations.filter(
        (reservation) => reservation.listing.id === listing.id
      )
    );
    setReservationData(
      reservations.filter(
        (reservation) => reservation.listing.id === listing.id
      )
    );
  }, []);

  useEffect(() => {
    const newEvents = reservationData.map((reservation) => ({
      id: reservation.id,
      title: reservation.user.firstName + " " + reservation.user.lastName,
      start: reservation.tripinfo.startDate,
      end: reservation.tripinfo.endDate,
      className: "primary",
      description: "testestes",
    }));

    setEvents(newEvents);
  }, [reservationData]);

  const getMonth = (dt, add = 0) => {
    let month = dt.getMonth() + 1 + add;
    const str = (month < 10 ? "0" + month : month).toString();
    return str;
    // return dt.getMonth() < 10 ? '0' + month : month;
  };

  return (
    <>
      <div className="panel mb-5">
        <div className="mb-4 flex flex-col items-center justify-center sm:flex-row sm:justify-between">
          <button
            type="button"
            className="flex items-center bg-blue-950 shadow-md shadow-blue-200 text-white px-4 py-2 rounded-lg"
            //onClick={() => editEvent()}
          >
            <svg
              className="h-5 w-5 ltr:mr-2 rtl:ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create Event
          </button>
        </div>
        <div className="calendar-wrapper">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            editable={true}
            dayMaxEvents={true}
            selectable={true}
            droppable={true}
            //eventClick={(event) => editEvent(event)}
            //select={(Event) => editDate(event)}
            events={events}
          />
        </div>
      </div>

      {/* add event modal */}
      {/*<Transition appear show={isAddEventModal} as={Fragment}>
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
                <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                  <button
                    type="button"
                    className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
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
                  <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pr-5 rtl:pl-[50px] dark:bg-[#121c2c]">
                    {params.id ? "Edit Event" : "Add Event"}
                  </div>
                  <div className="p-5">
                    <form className="space-y-5">
                      <div>
                        <label htmlFor="title">Event Title :</label>
                        <input
                          id="title"
                          type="text"
                          name="title"
                          className="form-input"
                          placeholder="Enter Event Title"
                          value={params.title || ""}
                          onChange={(e) => changeValue(e)}
                          required
                        />
                        <div className="mt-2 text-danger" id="titleErr"></div>
                      </div>

                      <div>
                        <label htmlFor="dateStart">From :</label>
                        <input
                          id="start"
                          type="datetime-local"
                          name="start"
                          className="form-input"
                          placeholder="Event Start Date"
                          value={params.start || ""}
                          min={minStartDate}
                          onChange={(event) => startDateChange(event)}
                          required
                        />
                        <div
                          className="mt-2 text-danger"
                          id="startDateErr"
                        ></div>
                      </div>
                      <div>
                        <label htmlFor="dateEnd">To :</label>
                        <input
                          id="end"
                          type="datetime-local"
                          name="end"
                          className="form-input"
                          placeholder="Event End Date"
                          value={params.end || ""}
                          min={minEndDate}
                          onChange={(e) => changeValue(e)}
                          required
                        />
                        <div className="mt-2 text-danger" id="endDateErr"></div>
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
                      <div>
                        <label>Badge:</label>
                        <div className="mt-3">
                          <label className="inline-flex cursor-pointer ltr:mr-3 rtl:ml-3">
                            <input
                              type="radio"
                              className="form-radio"
                              name="type"
                              value="primary"
                              checked={params.type === "primary"}
                              onChange={(e) =>
                                setParams({ ...params, type: e.target.value })
                              }
                            />
                            <span className="ltr:pl-2 rtl:pr-2">Work</span>
                          </label>
                          <label className="inline-flex cursor-pointer ltr:mr-3 rtl:ml-3">
                            <input
                              type="radio"
                              className="form-radio text-info"
                              name="type"
                              value="info"
                              checked={params.type === "info"}
                              onChange={(e) =>
                                setParams({ ...params, type: e.target.value })
                              }
                            />
                            <span className="ltr:pl-2 rtl:pr-2">Travel</span>
                          </label>
                          <label className="inline-flex cursor-pointer ltr:mr-3 rtl:ml-3">
                            <input
                              type="radio"
                              className="form-radio text-success"
                              name="type"
                              value="success"
                              checked={params.type === "success"}
                              onChange={(e) =>
                                setParams({ ...params, type: e.target.value })
                              }
                            />
                            <span className="ltr:pl-2 rtl:pr-2">Personal</span>
                          </label>
                          <label className="inline-flex cursor-pointer">
                            <input
                              type="radio"
                              className="form-radio text-danger"
                              name="type"
                              value="danger"
                              checked={params.type === "danger"}
                              onChange={(e) =>
                                setParams({ ...params, type: e.target.value })
                              }
                            />
                            <span className="ltr:pl-2 rtl:pr-2">Important</span>
                          </label>
                        </div>
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
                          className="btn btn-primary ltr:ml-4 rtl:mr-4"
                        >
                          {params.id ? "Update Event" : "Create Event"}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
                            </Transition>*/}
    </>
  );
};

export default BigCalendar;
