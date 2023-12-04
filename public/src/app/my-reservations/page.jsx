"use client";
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
import {
  getUserTrips,
  getUserListings,
  getUserReservedTrips,
  deleteTripAPI,
  addInvoice,
  EditStatusTrip,
} from "airbnb/lib/lisitng";
import { userAppStore } from "airbnb/store/store";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import Swal from "sweetalert2";
import Spinner from "airbnb/components/common/Spinner";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});

import { GrStatusDisabled } from "react-icons/gr";
import { LiaFileInvoiceSolid } from "react-icons/lia";

export default function Page() {
  const router = useRouter();
  const { userInfo } = userAppStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [reservationData, setReservationData] = useState([]);
  const [initialRecords, setInitialRecords] = useState([]);
  const [records, setRecords] = useState(initialRecords);
  const [relaunchData, setRelaunchData] = useState(false);
  const [loading, setLoading] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getUserReservedTrips(userInfo?.id);
      setReservationData(data);
      setInitialRecords(data);
      setRecords(data);
      console.log({ data });
      setLoading(false);
    };
    if (userInfo) {
      getData();
    }
  }, [relaunchData]);

  // Func Search bar
  useEffect(() => {
    setInitialRecords(() => {
      return reservationData?.filter((reservation) => {
        return (
          reservation.id.toLowerCase().includes(search.toLowerCase()) ||
          reservation.listing.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          reservation.user.firstName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          reservation.user.lastName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          reservation.user.username.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords([...(initialRecords || []).slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  function checkDateStatus(startDate, endDate) {
    const currentDate = new Date();
    const providedStartDate = new Date(startDate);
    const providedEndtDate = new Date(endDate);

    if (currentDate < providedEndtDate && currentDate > providedStartDate) {
      return "Checked In";
    }else if (currentDate > providedEndtDate){
      return "Checked Out";
    }else {
      return "Upcoming";
    }

  }

  const cancelTrip = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Cancelation confirmation",
      text: "Do you want to cancel this reservation?",
      showCancelButton: true,
      confirmButtonText: "Cancel",
      cancelButtonText: "Discard",
      padding: "2em",
      customClass: "sweet-alerts",
    });

    if (result.value) {
      try {
        const data = await EditStatusTrip(id,"Canceled");

        if (data.status === 200) {
          setRelaunchData((prev) => !prev);
          Swal.fire({
            title: "Cancel!",
            text: "Your reservation has been canceled.",
            icon: "success",
            customClass: "sweet-alerts",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Your reservation has not been canceled.",
            icon: "warning",
            customClass: "sweet-alerts",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Error Cancelation.",
          icon: "error",
          customClass: "sweet-alerts",
        });
      }
    }
  };

  const invoiceTrip = async (id, user) => {
    const result = await Swal.fire({
      icon: "info",
      title: "Billing confirmation",
      text: "Do you want to invoice this reservation?",
      showCancelButton: true,
      confirmButtonText: "Invoice",
      cancelButtonText: "Discard",
      padding: "2em",
      customClass: "sweet-alerts",
    });

    if (result.value) {
      try {
        
        const queryData = {
          tripId: id,
          userId: user.id,
        }
        const invoiceResult = await addInvoice(queryData);

        if(invoiceResult.status === 201){
          const data = await EditStatusTrip(id,"Invoice");
          if (data.status === 200) {
            setRelaunchData((prev) => !prev);
            Swal.fire({
              title: "Invoice!",
              text: "Your reservation has been billed.",
              icon: "success",
              customClass: "sweet-alerts",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Your reservation has not been billed.",
              icon: "warning",
              customClass: "sweet-alerts",
            });
          }
        }else{
          Swal.fire({
            title: "Error!",
            text: "Invoice didn't inserted.",
            icon: "warning",
            customClass: "sweet-alerts",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Error Billing.",
          icon: "error",
          customClass: "sweet-alerts",
        });
      }
    }
  };

  return (
    <>
      {!isClient ? (
        <Spinner />
      ) : (
        <div>
          <Navbar />
          <div className="flex justify-start items-start">
            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg w-full m-5 lg:m-20">
              {/*<Image src="/search.svg" width="20" className="absolute left-1 top-2" height="20" alt="search" />*/}
              <div className="relative rounded-md rtl:mr-auto">
                {/*<Image src="/search.svg" width="20" className="absolute left-1 top-2" height="20" alt="search" />*/}
                <input
                  type="text"
                  className="form-input w-full lg:w-1/5 rounded py-3 px-4 border shadow-md my-3"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="panel border-white-light px-0 pt-0">
                <div className="users-table">
                  <div className="datatables pagination-padding">
                    <DataTable
                      className="table-hover whitespace-nowrap"
                      records={records}
                      columns={[
                        {
                          accessor: "Listing Name",
                          render: ({ listing }) => (
                            <div className="px-6 py-4">{listing.title}</div>
                          ),
                        },
                        {
                          accessor: "Client Name",
                          textAlignment: "center",
                          render: ({ user }) => (
                            <div className="px-6 py-4">
                              {user.firstName} {user.lastName}
                            </div>
                          ),
                        },
                        {
                          accessor: "Email",
                          textAlignment: "center",
                          render: ({ user }) => (
                            <div className="px-6 py-4">{`${user.username}`}</div>
                          ),
                        },
                        {
                          accessor: "Check In Date",
                          textAlignment: "center",
                          render: ({ tripinfo }) => (
                            <div className="px-6 py-4">
                              {tripinfo.startDate}
                            </div>
                          ),
                        },
                        {
                          accessor: "Check Out Date",
                          textAlignment: "center",
                          render: ({ tripinfo }) => (
                            <div className="px-6 py-4">{tripinfo.endDate}</div>
                          ),
                        },
                        {
                          accessor: "Price",
                          textAlignment: "center",
                          render: ({ tripinfo }) => (
                            <div className="px-6 py-4">{tripinfo.price}</div>
                          ),
                        },
                        {
                          accessor: "Status",
                          textAlignment: "center",
                          render: ({ tripinfo, status }) => (
                            <div className="flex gap-1">
                              <span
                                className={`${
                                  checkDateStatus(
                                    tripinfo?.startDate,
                                    tripinfo?.endDate
                                  ) === "Upcoming"
                                    ? "bg-yellow-500"
                                    : checkDateStatus(
                                        tripinfo?.startDate,
                                        tripinfo?.endDate
                                      ) === "Checked In"
                                    ? "bg-blue-500"
                                    : "bg-pink-500"
                                }  text-white text-xs font-medium mr-2 px-2.5 py-1 rounded`}
                              >
                                {checkDateStatus(
                                  tripinfo?.startDate,
                                  tripinfo?.endDate
                                )}
                              </span>
                              <span
                                className={`${
                                  status === "Active"
                                    ? "bg-green-500"
                                    : status === "Invoice" ? "bg-teal-500" : "bg-red-500"
                                }  text-white text-xs font-medium mr-2 px-2.5 py-1 rounded`}
                              >
                                {status}
                              </span>
                            </div>
                          ),
                        },
                        {
                          accessor: "action",
                          title: "Actions",
                          sortable: false,
                          textAlignment: "center",
                          render: ({ id, status, tripinfo, user }) => (
                            <div className="flex justify-between items-center gap-2 px-6 py-4">
                              {status !== "Invoice" && status !== "Canceled" && <button
                                type="button"
                                className="flex hover:text-red-500"
                                onClick={() => cancelTrip(id)}
                              >
                                <GrStatusDisabled size={20} />
                              </button>}
                              {( checkDateStatus(
                                    tripinfo?.startDate,
                                    tripinfo?.endDate
                                  ) === "Checked In" || checkDateStatus(
                                    tripinfo?.startDate,
                                    tripinfo?.endDate
                                  ) === "Checked Out")  && status === "Active" &&
                                  <button
                                  type="button"
                                  className="flex hover:text-teal-500"
                                  onClick={() => invoiceTrip(id, user)}
                                >
                                  <LiaFileInvoiceSolid size={20} />
                                </button>
                              }
                            </div>
                          ),
                        },
                      ]}
                      highlightOnHover
                      customLoader={<Spinner />}
                      fetching={loading}
                      loaderBackgroundBlur={3}
                      totalRecords={initialRecords?.length}
                      recordsPerPage={pageSize}
                      page={page}
                      onPageChange={(p) => setPage(p)}
                      recordsPerPageOptions={PAGE_SIZES}
                      onRecordsPerPageChange={setPageSize}
                      paginationText={({ from, to, totalRecords }) =>
                        `${`${from} - ${to} / ${totalRecords}`} `
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CompactFooter />
          {!isDesktop && <NavbarMobile />}
        </div>
      )}
    </>
  );
}
