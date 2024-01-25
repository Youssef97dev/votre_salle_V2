"use client";

// Libs
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import { DataTable } from "mantine-datatable";
import moment from "moment";
import { useTranslation } from "react-i18next";

// Components
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
import Spinner from "airbnb/components/common/Spinner";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});

// Hooks
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";

// APIs
import {
  getInvoicesByUser,
  changeInvoiceStatus,
  downloadInvoice,
} from "airbnb/lib/lisitng";

// Store
import { userAppStore } from "airbnb/store/store";

// Icons
import { MdPaid } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";

const page = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { userInfo } = userAppStore();

  const [search, setSearch] = useState("");
  const [invoiceData, setInvoiceData] = useState([]);
  const [initialRecords, setInitialRecords] = useState([]);
  const [records, setRecords] = useState(initialRecords);
  const [relaunchData, setRelaunchData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Prevent Hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get invoice data
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getInvoicesByUser(userInfo?.id);
      setInvoiceData(data);
      setInitialRecords(data);
      setRecords(data);
      console.log("invoices data: ", data);
      setLoading(false);
    };
    if (userInfo) {
      getData();
    }
  }, [relaunchData]);

  // Update invoice status
  const updateStatus = async (id, status) => {
    const result = await Swal.fire({
      icon: "warning",
      title: `Confirm to switch to ${status}`,
      text: `Do you want to to switch to ${status}?`,
      showCancelButton: true,
      confirmButtonText: "Switch",
      cancelButtonText: "Discard",
      padding: "2em",
      customClass: "sweet-alerts",
    });

    if (result.value) {
      try {
        const data = await changeInvoiceStatus(id, status);

        if (data.status === 200) {
          setRelaunchData((prev) => !prev);
          Swal.fire({
            title: `${status}!`,
            text: `Your invoice has been ${status}.`,
            icon: "success",
            customClass: "sweet-alerts",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: `Your invoice has not been ${status}.`,
            icon: "warning",
            customClass: "sweet-alerts",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `Error in ${status}.`,
          icon: "error",
          customClass: "sweet-alerts",
        });
      }
    }
  };

  // Search Function
  useEffect(() => {
    setInitialRecords(() => {
      return invoiceData?.filter((invoice) => {
        return (
          invoice.id.toString().includes(search.toLowerCase()) ||
          invoice.trips.user.firstName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          invoice.trips.user.lastName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          invoice.trips.user.phone
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          invoice.status.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [search]);

  // Pagination
  useEffect(() => {
    setPage(1);
  }, [pageSize]);
  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords([...(initialRecords || []).slice(from, to)]);
  }, [page, pageSize, initialRecords]);

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
                  placeholder={`${t("page.invoices.search")}...`}
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
                          accessor: `${t("page.invoices.number")}`,
                          render: ({ id }) => (
                            <div className="px-6 py-4">{`#${id
                              .toString()
                              .padStart(4, "0")}`}</div>
                          ),
                        },
                        {
                          accessor: `${t("page.invoices.full_name")}`,
                          textAlignment: "center",
                          render: ({ trips }) => (
                            <div className="px-6 py-4">
                              {trips.user.firstName} {trips.user.lastName}
                            </div>
                          ),
                        },
                        {
                          accessor: `${t("page.invoices.phone")}`,
                          textAlignment: "center",
                          render: ({ trips }) => (
                            <div className="px-6 py-4">{trips.user.phone}</div>
                          ),
                        },
                        {
                          accessor: "Date",
                          textAlignment: "center",
                          render: ({ createdAt }) => (
                            <div className="px-6 py-4">
                              {moment(createdAt).format("dddd, DD MMMM YYYY")}
                            </div>
                          ),
                        },
                        {
                          accessor: `${t("page.invoices.status")}`,
                          textAlignment: "center",
                          render: ({ status }) => (
                            <div
                              className={`badge ${
                                status === "Pending"
                                  ? "badge-outline-warning"
                                  : status === "Paid"
                                  ? "badge-outline-success"
                                  : "badge-outline-danger"
                              }  border-2 border-dashed py-2`}
                            >
                              {status}
                            </div>
                          ),
                        },
                        {
                          accessor: "action",
                          title: "Actions",
                          sortable: false,
                          textAlignment: "center",
                          render: ({ id, status }) => (
                            <div
                              className={`${
                                status === "Pending" &&
                                "flex justify-evenly items-center gap-2"
                              } px-6 py-4`}
                            >
                              <button
                                type="button"
                                className="text-[#3B3F5C] hover:text-[#E2A03F]"
                                onClick={() => downloadInvoice(id)}
                              >
                                <FaFileDownload size={20} />
                              </button>
                              {status === "Pending" && (
                                <button
                                  type="button"
                                  className="text-[#3B3F5C] hover:text-[#00AB55]"
                                  onClick={() => updateStatus(id, "Paid")}
                                >
                                  <MdPaid size={23} />
                                </button>
                              )}
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
};

export default page;
