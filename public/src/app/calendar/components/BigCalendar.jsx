import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import { userAppStore } from "airbnb/store/store";
import { addTrip } from "airbnb/lib/lisitng";
import "../../../styles/fullcalendar.css";
import "../../../styles/tailwind.css";

const BigCalendar = ({ listing }) => {
  const now = new Date();

  const { isAuthModalOpen, userInfo, reservations, setRelaunchData } =
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
    type: "danger",
  };
  const [params, setParams] = useState(defaultParams);

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
      title:
        reservation.tripinfo?.type === "Stop Reservation"
          ? reservation.tripinfo.type
          : reservation.user.firstName + " " + reservation.user.lastName,
      start: reservation.tripinfo.startDate,
      end: reservation.tripinfo.endDate,
      className:
        reservation.status === "Active"
          ? reservation.tripinfo?.type === "Stop Reservation"
            ? "danger"
            : "primary"
          : "bg-orange-500 border border-orange-700",
      description: reservation.tripinfo?.description || "",
    }));

    setEvents(newEvents);
  }, [reservationData]);

  const getMonth = (dt, add = 0) => {
    let month = dt.getMonth() + 1 + add;
    const str = (month < 10 ? "0" + month : month).toString();
    return str;
    // return dt.getMonth() < 10 ? '0' + month : month;
  };

  const dateFormat = (dt) => {
    dt = new Date(dt);
    const month =
      dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
    const date = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
    dt = dt.getFullYear() + "-" + month + "-" + date;
    console.log(dt);
    return dt;
  };

  const editEvent = (data = null) => {
    let params = JSON.parse(JSON.stringify(defaultParams));
    setParams(params);
    if (data) {
      let obj = JSON.parse(JSON.stringify(data.event));
      console.log("obj", obj);
      setParams({
        id: obj.id ? obj.id : null,
        title: obj.title ? obj.title : "Stop Reservation",
        start: dateFormat(obj.start),
        end: dateFormat(obj.end),
        type: "danger",
        description: obj.extendedProps ? obj.extendedProps.description : "",
      });
      setMinStartDate(new Date());
      setMinEndDate(dateFormat(obj.start));
      (obj?.title === "Stop Reservation" || obj?.title === undefined) &&
        setIsAddEventModal(true);
    } else {
      setMinStartDate(new Date());
      setMinEndDate(new Date());
      setIsAddEventModal(true);
    }
  };

  const editDate = (data) => {
    let obj = {
      event: {
        start: data.start,
        end: data.end,
      },
    };
    editEvent(obj);
  };

  const handleStopReservation = async (event) => {
    const data = {
      listingId: listing.id,
      userId: userInfo?.id,
      tripData: {
        startDate: event.start,
        endDate: event.end,
        description: event.description,
        type: event.title,
      },
      status: "Active",
    };

    try {
      const response = await addTrip(data);
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  };

  const saveEvent = () => {
    if (!params.title) {
      return true;
    }
    if (!params.start) {
      return true;
    }
    if (!params.end) {
      return true;
    }
    //add event
    let maxEventId = 0;
    if (events) {
      maxEventId = events.reduce(
        (max, character) => (character.id > max ? character.id : max),
        events[0].id
      );
    }
    maxEventId = maxEventId + 1;
    let event = {
      id: maxEventId,
      title: params.title,
      start: params.start,
      end: params.end,
      description: params.description,
      className: params.type,
    };
    let dataevent = events || [];
    dataevent = dataevent.concat([event]);
    setTimeout(() => {
      setEvents(dataevent);
    });
    console.log(dataevent);
    const response = handleStopReservation(event);
    if (response) {
      showMessage("Reservation has been stoped.");
      setRelaunchData();
    }
    setIsAddEventModal(false);
  };

  const startDateChange = (event) => {
    const dateStr = event.target.value;
    if (dateStr) {
      setMinEndDate(dateFormat(dateStr));
      setParams({ ...params, start: dateStr, end: "" });
    }
  };

  const changeValue = (e) => {
    const { value, id } = e.target;
    setParams({ ...params, [id]: value });
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
    <>
      <div className="panel mb-5">
        <div className="mb-4 flex flex-col items-center justify-center sm:flex-row sm:justify-between">
          {/*<button
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
  </button>*/}
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
            eventClick={(event) => editEvent(event)}
            select={(event) => editDate(event)}
            events={events}
          />
        </div>
      </div>

      {/* add event modal */}
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
                <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black">
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
                          type="date"
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
                          type="date"
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
                        >
                          {params.id ? "Update stop sales" : "Stop sales"}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BigCalendar;
