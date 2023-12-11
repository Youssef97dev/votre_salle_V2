import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import { userAppStore } from "airbnb/store/store";
import { addTrip, deleteTripAPI, updateTrip } from "airbnb/lib/lisitng";
import { BeatLoader } from "react-spinners";

const StopSales = ({ isAddEventModal, setIsAddEventModal, listing }) => {
  const now = new Date();

  const { isAuthModalOpen, userInfo, reservations, setRelaunchTrips } =
    userAppStore();
  const defaultParams = {
    id: listing?.title === "Stop sales" ? listing?.id : null,
    start: listing?.startDate || "",
    end: listing?.endDate || "",
    description: listing?.description || "",
  };
  const [params, setParams] = useState(defaultParams);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

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
    
  }

  const saveEvent = async () => {
    setIsUpdateLoading(true);
    if (!params.start || !params.end) {
      return true;
    }
    //add event
    let event = {
      start: params.start,
      end: params.end,
      description: params.description,
    };
    if(params?.id){
      const response = await handleUpdateStopReservation(event);
    if (response.status === 200) {
      showMessage("Stop reservation has been updated.");
      setIsUpdateLoading(false);
    }
    }else{
      const response = await handleStopReservation(event);
      console.log("response",response)
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
    if(response?.status === 200){
      showMessage("Reservation has been deleted.");
      setRelaunchTrips();
      setIsDeleteLoading(false);
    }
    setIsAddEventModal(false);
  }

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
                      <label htmlFor="dateStart">From :</label>
                      <input
                        id="start"
                        type="date"
                        name="start"
                        className="form-input"
                        placeholder="Event Start Date"
                        value={params.start || ""}
                        onChange={(event) => changeValue(event)}
                        required
                      />
                      <div className="mt-2 text-danger" id="startDateErr"></div>
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
                        disabled={isDeleteLoading || isUpdateLoading}
                      >
                        
                        {!isUpdateLoading ? (params.id ? "Update stop sales" : "Stop sales") : <BeatLoader color="#fff" size={5} />}
                      </button>
                      {params?.id && <button
                        type="button"
                        onClick={() => deleteEvent(params.id)}
                        className="btn btn-warning ml-4"
                        disabled={isDeleteLoading || isUpdateLoading}
                      >
                        {!isDeleteLoading ? "Delete" : <BeatLoader color="#fff" size={5} />}
                      </button>}
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
