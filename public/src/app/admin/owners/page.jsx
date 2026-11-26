"use client";

// Libs
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { DataTable } from "mantine-datatable";
import moment from "moment";

// Icons
import { IoMdSearch } from "react-icons/io";
import { MdAddRoad, MdEditSquare } from "react-icons/md";
import { RiUserForbidFill } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa";

// Components
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
import Spinner from "airbnb/components/common/Spinner";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});
import AddOwner from "../components/AddOwner";
import EditOwner from "../components/EditOwner";

// Hooks
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
import useNotifications from "airbnb/hooks/useNotifications";

// APIs
import {
  confirmChangeTypeUser,
  getUsers,
  confirmSuspendUser,
} from "airbnb/lib/admin";

// Store
import { userAppStore } from "airbnb/store/store";

const page = () => {
  const router = useRouter();
  const { userInfo } = userAppStore();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [initialRecords, setInitialRecords] = useState([]);
  const [records, setRecords] = useState(initialRecords);
  const [relaunchData, setRelaunchData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const [showAddOwner, setShowAddOwner] = useState(false);
  const [showEditOwner, setShowEditOwner] = useState(false);
  const [dataRow, setDataRow] = useState({});

  const PAGE_SIZES = [7, 10, 20, 30, 50, 100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Custom notification hook
  const { showNotification, showAlertConfirmation } = useNotifications();

  // Prevent Hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // protect admin page
  useEffect(() => {
    // Check if user is authenticated
    if (!userInfo) {
      router.push("/login");
    }
    // Check if user is admin
    if (userInfo.roles[0] !== "admin") {
      router.push("/");
    }
  }, [userInfo, router]);

  // Get users data
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getUsers("owner");
      setUsers(data);
      setInitialRecords(data);
      setRecords(data);
      console.log("users data: ", data);
      setLoading(false);
    };
    if (userInfo) {
      getData();
    }
  }, [relaunchData]);

  // Search Function
  useEffect(() => {
    setInitialRecords(() => {
      return users?.filter((user) => {
        return (
          user?.id?.toString().includes(search.toLowerCase()) ||
          user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
          user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
          user?.phone?.toLowerCase().includes(search.toLowerCase()) ||
          user?.username?.toLowerCase().includes(search.toLowerCase()) ||
          user?.adresse?.toLowerCase().includes(search.toLowerCase())
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

  // Update Type User
  const updateTypeUser = async (id, type) => {
    const result = await showAlertConfirmation(
      "warning",
      `Confirm to switch to ${type}`,
      `Do you want to to switch to ${type}?`
    ).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
    });

    if (result.value) {
      try {
        setLoading(true);
        const data = await confirmChangeTypeUser(id, type);

        if (data.status === 200) {
          setRelaunchData((prev) => !prev);
          showNotification("success", "User has been updated");
        } else {
          showNotification("warning", "User has not been updated");
        }
      } catch (error) {
        showNotification("error", "Error in updating");
      } finally {
        setLoading(false);
      }
    }
  };

  // Change Role User
  const toggleSuspendUser = async (id, suspended) => {
    const result = await showAlertConfirmation(
      "warning",
      `Confirm to ${suspended ? "restore" : "suspend"} the account`,
      `Do you want to ${suspended ? "restore" : "suspend"} the account?`
    ).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
    });

    if (result) {
      try {
        setLoading(true);
        const data = await confirmSuspendUser(id, suspended);

        if (data.status === 200) {
          setRelaunchData((prev) => !prev);
          showNotification("success", "User has been updated");
        } else {
          showNotification("warning", "User has not been updated");
        }
      } catch (error) {
        showNotification("error", "Error in updating");
      } finally {
        setLoading(false);
      }
    }
  };

  // Edit Owner
  const editOwner = (row) => {
    setDataRow(row);
    setShowEditOwner(true);
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
              <div className="relative flex items-center justify-between rounded-md">
                <div className="w-full">
                  <IoMdSearch
                    color="#888ea8"
                    size={20}
                    className="absolute left-1 top-5"
                  />
                  <input
                    type="text"
                    className="form-input w-full lg:w-1/5 rounded-lg pl-6 border shadow-md my-3"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setShowAddOwner(true)}
                  className="btn btn-primary flex items-center gap-3 whitespace-nowrap"
                >
                  <MdAddRoad size={18} /> Add Owner
                </button>
              </div>
              <div className="panel border-[#e0e6ed] px-0 pt-0">
                <div className="users-table">
                  <div className="datatables pagination-padding">
                    <DataTable
                      className="table-hover whitespace-nowrap"
                      records={records}
                      columns={[
                        {
                          accessor: "Full name",
                          textAlignment: "center",
                          width: 100,
                          render: ({ firstName, lastName }) => (
                            <div className="px-6 py-4">
                              {firstName} {lastName}
                            </div>
                          ),
                        },
                        {
                          accessor: "Email",
                          textAlignment: "center",
                          width: 220,
                          render: ({ username }) => (
                            <div className="px-6 py-4">{username}</div>
                          ),
                        },
                        {
                          accessor: "Phone",
                          textAlignment: "center",
                          width: 80,
                          render: ({ phone }) => (
                            <div className="px-6 py-4">{phone}</div>
                          ),
                        },
                        {
                          accessor: "Halls Count",
                          textAlignment: "center",
                          width: 50,
                          render: ({ listings }) => (
                            <div className="px-6 py-4">{listings?.length}</div>
                          ),
                        },
                        {
                          accessor: "Pack",
                          textAlignment: "center",
                          width: 80,
                          render: ({ pack }) => (
                            <div className="px-6 py-4">
                              <div
                                className={`badge w-full border-2 border-dashed py-2 ${
                                  pack === 0
                                    ? "badge-outline-danger"
                                    : pack >= 3 && pack < 8
                                    ? "badge-outline-secondary"
                                    : pack >= 8 && pack < 15
                                    ? "badge-outline-primary"
                                    : pack >= 15 && "badge-outline-warning"
                                }`}
                              >
                                {pack === 0
                                  ? "No pack"
                                  : pack >= 3 && pack < 8
                                  ? "Starter"
                                  : pack >= 8 && pack < 15
                                  ? "Professional"
                                  : pack >= 15 && "Gold"}
                              </div>
                            </div>
                          ),
                        },
                        {
                          accessor: "Role",
                          textAlignment: "center",
                          width: 100,
                          render: ({ roles, typeUser, username }) => (
                            <div className="flex items-center justify-center gap-2 w-full">
                              <div
                                className={`badge w-full ${
                                  roles[0] === "admin"
                                    ? "badge-outline-warning"
                                    : roles[0] === "owner"
                                    ? "badge-outline-success"
                                    : "badge-outline-info"
                                }  border-2 border-dashed py-2`}
                              >
                                {roles[0]}
                              </div>
                              {roles[0] !== "admin" && username !== "admin" && (
                                <div
                                  className={`badge w-full ${
                                    typeUser === "B2C"
                                      ? "badge-outline-success"
                                      : "badge-outline-info"
                                  }  border-2 border-dashed py-2`}
                                >
                                  {typeUser}
                                </div>
                              )}
                            </div>
                          ),
                        },
                        {
                          accessor: "Actions",
                          textAlignment: "center",
                          width: 100,
                          render: (row) => (
                            <div className="flex items-center justify-center gap-2 w-full">
                              {row.typeUserNotification !== row.typeUser &&
                                row.typeUserNotification !== null && (
                                  <button
                                    onClick={() =>
                                      updateTypeUser(
                                        row.id,
                                        row.typeUserNotification
                                      )
                                    }
                                    className={`btn btn-danger`}
                                    disabled={loading}
                                  >
                                    Change to {row.typeUserNotification}
                                  </button>
                                )}
                              <button
                                onClick={() =>
                                  toggleSuspendUser(row.id, row.suspended)
                                }
                                className={`btn ${
                                  row.suspended ? "btn-success" : "btn-warning"
                                } `}
                                disabled={loading}
                              >
                                {row.suspended ? (
                                  <FaUserCheck
                                    color="#fff"
                                    className={`text-lg`}
                                  />
                                ) : (
                                  <RiUserForbidFill
                                    color="#fff"
                                    className={`text-lg`}
                                  />
                                )}
                              </button>
                              <button
                                onClick={() => editOwner(row)}
                                className={`btn btn-info`}
                                disabled={loading}
                              >
                                <MdEditSquare
                                  color="#fff"
                                  className={`text-lg`}
                                />
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
          {showAddOwner && (
            <AddOwner
              showAddOwner={showAddOwner}
              setShowAddOwner={setShowAddOwner}
              setRelaunchData={setRelaunchData}
            />
          )}
          {showEditOwner && (
            <EditOwner
              showEditOwner={showEditOwner}
              setShowEditOwner={setShowEditOwner}
              dataRow={dataRow}
              setRelaunchData={setRelaunchData}
            />
          )}
          {!isDesktop && <NavbarMobile />}
        </div>
      )}
    </>
  );
};

export default page;
