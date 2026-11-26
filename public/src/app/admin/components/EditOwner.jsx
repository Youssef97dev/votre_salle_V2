"use client";

// Styles
import "../../../styles/tailwind.css";
import "../../../styles/file-upload-with-preview.css";

// Dialogue Lib
import { Dialog, Transition, Switch } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";

// API and Store
import { editOwner } from "airbnb/lib/admin";
import { userAppStore } from "airbnb/store/store";

// Icons
import { RiAlarmWarningLine } from "react-icons/ri";

// Libs
import { BeatLoader } from "react-spinners";
import Image from "next/image";

// Cloudinary
import { CldUploadButton } from "next-cloudinary";

const EditOwner = ({
  showEditOwner,
  setShowEditOwner,
  dataRow,
  setRelaunchData,
}) => {
  // Validation and Messages
  const [MessageAlert, setMessageAlert] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [WhichField, setWhichField] = useState(null);
  const [ToggleMessageAlert, setToggleMessageAlert] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  // Image State
  const [selectedFile, setSelectedFile] = useState(dataRow.profileLogo || "");
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  // User Data State
  const [userData, setUserData] = useState({
    firstName: dataRow?.firstName || "",
    lastName: dataRow?.lastName || "",
    email: dataRow?.username || "",
    phone: dataRow?.phone || "",
    adresse: dataRow?.adresse || "",
    pack: dataRow?.pack || 0,
  });
  const [companyInfo, setCompanyInfo] = useState({
    rc: dataRow?.companyInfo?.rc || "",
    cnss: dataRow?.companyInfo?.cnss || "",
    idFiscale: dataRow?.companyInfo?.idFiscale || "",
    ice: dataRow?.companyInfo?.ice || "",
  });

  const validateField = (field, value, regex, minLength, maxLength) => {
    setWhichField(field);

    if (minLength && value.length < minLength) {
      setMessageAlert(
        `Please check ${field}. It must contain at least ${minLength} characters.`
      );
      setToggleMessageAlert(true);
      return false;
    }
    if (maxLength && value.length > maxLength) {
      setMessageAlert(
        `Please check ${field}. It must not exceed ${maxLength} characters.`
      );
      setToggleMessageAlert(true);
      return false;
    }
    if (regex && !regex.test(value)) {
      setMessageAlert(`Please check ${field}.`);
      setToggleMessageAlert(true);
      return false;
    }

    return true;
  };

  const handleEditOwner = async (e) => {
    e.preventDefault();
    setLoadingSend(true);
    if (
      !validateField("firstName", userData.firstName, undefined, 2, 50) ||
      !validateField("lastName", userData.lastName, undefined, 2, 50) ||
      !validateField(
        "email",
        userData.email,
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        undefined,
        255
      ) ||
      !validateField(
        "phone",
        userData.phone,
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        10,
        18
      ) ||
      !validateField("rc", companyInfo.rc, /^[0-9]+$/, 4, 10) ||
      !validateField("idFiscale", companyInfo.idFiscale, /^[0-9]+$/, 5, 10) ||
      !validateField("cnss", companyInfo.cnss, /^[0-9]+$/, 6, 10) ||
      !validateField("ice", companyInfo.ice, /^[0-9]+$/, 9, 10)
    ) {
      setLoadingSend(false);
      return;
    }

    const data = await editOwner(
      userData.email,
      userData.firstName,
      userData.lastName,
      userData.phone,
      userData.adresse,
      userData.pack,
      companyInfo,
      selectedFile,
      dataRow.id
    );
    if (data?.response?.data?.error) {
      setErrorMessage(data.response.data.message);
      console.log(userData);
      setLoadingSend(false);
    } else {
      console.log(data);
      setWhichField(null);
      setLoadingSend(false);
      setRelaunchData((prev) => !prev);
      setShowEditOwner(false);
    }
  };

  const handleUpload = (data) => {
    console.log(data);
    setSelectedFile(data.info.secure_url);
  };
  console.log(userData);
  return (
    <Transition appear show={showEditOwner} as={Fragment}>
      <Dialog
        as="div"
        open={showEditOwner}
        onClose={() => setShowEditOwner(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>
        <div
          id="fadein_left_modal"
          className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-2xl my-8 text-black animate__animated animate__fadeIn">
              <div className="flex bg-[#fbfbfb] items-center justify-between px-5 py-3 border-b border-gray-300">
                <h5 className="font-bold text-lg">Edit Owner</h5>
                <button
                  onClick={() => setShowEditOwner(false)}
                  type="button"
                  className="text-white-dark hover:text-dark"
                >
                  X
                </button>
              </div>
              <div className="p-4">
                {errorMessage !== "" && (
                  <div className="flex items-center p-3.5 my-2 rounded text-[#e2a03f] bg-[#fff9ed]">
                    <span className="pr-2">
                      <strong className="mr-1">Warning!</strong>
                      <span>{errorMessage}.</span>
                    </span>
                    <button
                      onClick={() => setErrorMessage("")}
                      type="button"
                      className="ml-auto hover:opacity-80"
                    >
                      X
                    </button>
                  </div>
                )}

                <div
                  className={`relative mb-2 flex items-center border p-3.5 rounded before:inline-block before:absolute before:top-1/2 before:right-0 before:-mt-2 before:border-r-8 before:border-t-8 before:border-b-8 before:border-t-transparent before:border-b-transparent before:border-r-inherit text-[#e2a03f] bg-[#fff9ed] border-[#e2a03f] border-r-[45px] ${
                    ToggleMessageAlert ? "block" : "hidden"
                  }`}
                >
                  <span className="absolute -right-9 inset-y-0 text-white w-6 h-6 m-auto">
                    <RiAlarmWarningLine size={18} />
                  </span>
                  <span className="pr-2">
                    <strong className="mr-1">Warning!</strong> - {MessageAlert}.
                  </span>
                  <button
                    onClick={() => setToggleMessageAlert(false)}
                    type="button"
                    className="ml-auto hover:opacity-80"
                  >
                    X
                  </button>
                </div>

                <form
                  className="space-y-3"
                  onSubmit={(e) => handleEditOwner(e)}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="firstName">First Name</label>
                      <input
                        id="firstName"
                        type="text"
                        className={`form-input ${
                          WhichField === "firstName"
                            ? "border-2 border-[#e2a03f]"
                            : ""
                        }  `}
                        placeholder="Enter First Name"
                        value={userData.firstName}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            [e.target.id]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        id="lastName"
                        type="text"
                        className={`form-input ${
                          WhichField === "lastName"
                            ? "border-2 border-[#e2a03f]"
                            : ""
                        }  `}
                        placeholder="Enter Last Name"
                        value={userData.lastName}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            [e.target.id]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        className={`form-input ${
                          WhichField === "email"
                            ? "border-2 border-[#e2a03f]"
                            : ""
                        }  `}
                        placeholder="Enter Email"
                        value={userData.email}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            [e.target.id]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        type="phone"
                        className={`form-input ${
                          WhichField === "phone"
                            ? "border-2 border-[#e2a03f]"
                            : ""
                        }  `}
                        placeholder="Enter phone"
                        value={userData.phone}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            [e.target.id]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="adresse">Adresse</label>
                    <textarea
                      id="adresse"
                      className="form-input"
                      placeholder="Enter Adresse"
                      value={userData.adresse}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          [e.target.id]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="rc">R.C</label>
                      <input
                        id="rc"
                        name="rc"
                        type="text"
                        className={`form-input ${
                          WhichField === "rc" ? "border-2 border-[#e2a03f]" : ""
                        }  `}
                        placeholder="Enter RC"
                        value={companyInfo.rc}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="cnss">C.N.S.S</label>
                      <input
                        id="cnss"
                        name="cnss"
                        type="text"
                        className={`form-input ${
                          WhichField === "cnss"
                            ? "border-2 border-[#e2a03f]"
                            : ""
                        }  `}
                        placeholder="Enter cnss"
                        value={companyInfo.cnss}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="if">I.F</label>
                      <input
                        id="if"
                        name="idFiscale"
                        type="text"
                        className={`form-input ${
                          WhichField === "idFiscale"
                            ? "border-2 border-[#e2a03f]"
                            : ""
                        }  `}
                        placeholder="Enter IF"
                        value={companyInfo.idFiscale}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="ice">I.C.E</label>
                      <input
                        id="ice"
                        name="ice"
                        type="text"
                        className={`form-input ${
                          WhichField === "ice"
                            ? "border-2 border-[#e2a03f]"
                            : ""
                        }  `}
                        placeholder="Enter ICE"
                        value={companyInfo.ice}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="pack">Pack</label>
                    <select
                      id="pack"
                      className={`form-select ${
                        WhichField === "pack" ? "border-2 border-[#e2a03f]" : ""
                      }  `}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          [e.target.id]: e.target.value,
                        })
                      }
                      defaultValue={userData.pack}
                    >
                      <option>Pack</option>
                      <option value={3}>Starter</option>
                      <option value={8}>Professional</option>
                      <option value={15}>Gold</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <div className="w-1/2">
                      <CldUploadButton
                        options={{ multiple: false }}
                        onUpload={handleUpload}
                        uploadPreset="swyoq6cp"
                      >
                        <span className="btn btn-info">Upload Logo</span>
                      </CldUploadButton>
                    </div>
                    <div className="w-full flex flex-row items-center justify-center">
                      {selectedFile && (
                        <div className="relative h-36 w-36">
                          <Image src={selectedFile} fill alt="upload" />
                        </div>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    {!loadingSend ? (
                      "Save"
                    ) : (
                      <BeatLoader
                        loading={loadingSend}
                        color="#fff"
                        size={10}
                      />
                    )}
                  </button>
                </form>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditOwner;
