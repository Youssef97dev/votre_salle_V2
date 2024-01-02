"use client";

// Libs
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import { DataTable } from "mantine-datatable";
import moment from "moment";

// Icons
import { IoMdSearch } from "react-icons/io";
import { MdAddRoad } from "react-icons/md";

// Components
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
import Spinner from "airbnb/components/common/Spinner";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});
import AddOwner from "../components/AddOwner";

// Hooks
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";

// APIs
import {confirmChangeTypeUser, getUsers } from "airbnb/lib/admin";

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

  const PAGE_SIZES = [7, 10, 20, 30, 50, 100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

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
    const result = await Swal.fire({
      icon: "warning",
      title: `Confirm to switch to ${type}`,
      text: `Do you want to to switch to ${type}?`,
      showCancelButton: true,
      confirmButtonText: "Switch",
      cancelButtonText: "Discard",
      padding: "2em",
      customClass: "sweet-alerts",
    });

    if (result.value) {
      try {
        setLoading(true);
        const data = await confirmChangeTypeUser(id, type);

        if (data.status === 200) {
          setRelaunchData((prev) => !prev);
          Swal.fire({
            title: `${type}!`,
            text: `User has been updated.`,
            icon: "success",
            customClass: "sweet-alerts",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: `User has not been updated.`,
            icon: "warning",
            customClass: "sweet-alerts",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `Error in updating.`,
          icon: "error",
          customClass: "sweet-alerts",
        });
      } finally {
        setLoading(false);
      }
    }
  };

   // Change Role User
   const changeRoleUser = async (id, role) => {
    const result = await Swal.fire({
      icon: "warning",
      title: `Confirm to change to ${role}`,
      text: `Do you want to to change to ${role}?`,
      showCancelButton: true,
      confirmButtonText: "Change",
      cancelButtonText: "Discard",
      padding: "2em",
      customClass: "sweet-alerts",
    });

    if (result.value) {
      try {
        setLoading(true);
        const data = await confirmChangeRoleUser(id, role);

        if (data.status === 200) {
          setRelaunchData((prev) => !prev);
          Swal.fire({
            title: `${role}!`,
            text: `User has been updated.`,
            icon: "success",
            customClass: "sweet-alerts",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: `User has not been updated.`,
            icon: "warning",
            customClass: "sweet-alerts",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `Error in updating.`,
          icon: "error",
          customClass: "sweet-alerts",
        });
      } finally {
        setLoading(false);
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
              <div className="relative flex items-center justify-between rounded-md">
                <div className="w-full">
                <IoMdSearch color="#888ea8" size={20} className="absolute left-1 top-5" />
                <input
                  type="text"
                  className="form-input w-full lg:w-1/5 rounded-lg pl-6 border shadow-md my-3"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                </div>
                <button onClick={() => setShowAddOwner(true)} className="btn btn-primary flex items-center gap-3 whitespace-nowrap">
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
                          width: 80,
                          render: ({ firstName, lastName }) => (
                            <div className="px-6 py-4">
                              {firstName} {lastName}
                            </div>
                          ),
                        },
                        {
                          accessor: "Email",
                          textAlignment: "center",
                          width: 100,
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
                          accessor: "Adresse",
                          textAlignment: "center",
                          width: 180,
                          render: ({ adresse }) => (
                            <div className="px-6 py-4">{adresse}</div>
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
                          render: ({ id, typeUser, typeUserNotification }) => (
                            <div className="flex items-center justify-center gap-2 w-full">
                              {typeUserNotification !== typeUser &&
                                typeUserNotification !== null && (
                                  <button
                                    onClick={() =>
                                      updateTypeUser(id, typeUserNotification)
                                    }
                                    className={`btn btn-danger`}
                                    disabled={loading}
                                  >
                                    Change to {typeUserNotification}
                                  </button>
                                )}
                                <button onClick={() => changeRoleUser(id, "user") } className={`btn btn-primary`} disabled={loading}>
                                  set As User
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
          {showAddOwner && <AddOwner showAddOwner={showAddOwner} setShowAddOwner={setShowAddOwner} setRelaunchData={setRelaunchData} />}
          {!isDesktop && <NavbarMobile />}
        </div>
      )}
    </>
  );
};

export default page;
