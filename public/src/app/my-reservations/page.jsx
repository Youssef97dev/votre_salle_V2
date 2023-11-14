"use client";
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
import {
  getUserTrips,
  getUserListings,
  getUserReservedTrips,
  deleteTripAPI,
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

    if (providedStartDate > currentDate) {
      if (currentDate < providedEndtDate) {
        return "Checked In";
      } else if (currentDate > providedEndtDate) {
        return "Checked Out";
      }
    } else if (providedStartDate < currentDate) {
      return "Upcoming";
    }
  }

  const deleteTrip = async (id, status) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Confirmation du suppression",
      text: "Voulez vous supprimer cette reservation?",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
      padding: "2em",
      customClass: "sweet-alerts",
    });

    if (result.value) {
      try {
        const data = await EditStatusTrip(
          id,
          status === "Active" ? "UnActive" : "Active"
        );

        if (data.status === 200) {
          setRelaunchData((prev) => !prev);
          Swal.fire({
            title: "Annuler!",
            text: "Votre réservation a été annulé.",
            icon: "success",
            customClass: "sweet-alerts",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Votre réservation n'a été pas annulé.",
            icon: "warning",
            customClass: "sweet-alerts",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Error sur l'annulation.",
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
                          render: ({ tripinfo }) => (
                            <div className="px-6 py-4">
                              <span
                                className={`${
                                  checkDateStatus(
                                    tripinfo?.startDate,
                                    tripinfo?.endDate
                                  ) === "Upcoming"
                                    ? "bg-orange-500"
                                    : checkDateStatus(
                                        tripinfo?.startDate,
                                        tripinfo?.endDate
                                      ) === "Checked In"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }  text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}
                              >
                                {checkDateStatus(
                                  tripinfo?.startDate,
                                  tripinfo?.endDate
                                )}
                              </span>
                            </div>
                          ),
                        },
                        {
                          accessor: "action",
                          title: "Actions",
                          sortable: false,
                          textAlignment: "center",
                          render: ({ id, status }) => (
                            <div className="px-6 py-4">
                              <button
                                type="button"
                                className="flex hover:text-danger"
                                onClick={() => deleteTrip(id, status)}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                >
                                  <path
                                    d="M20.5001 6H3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  ></path>
                                  <path
                                    d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  ></path>
                                  <path
                                    opacity="0.5"
                                    d="M9.5 11L10 16"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  ></path>
                                  <path
                                    opacity="0.5"
                                    d="M14.5 11L14 16"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  ></path>
                                  <path
                                    opacity="0.5"
                                    d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  ></path>
                                </svg>
                              </button>
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
