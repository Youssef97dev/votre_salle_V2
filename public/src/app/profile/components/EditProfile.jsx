"use client";
import { userAppStore } from "airbnb/store/store";
import { updateMyProfile, changeTypeUser } from "airbnb/lib/lisitng";
import { checkUser } from "airbnb/lib/auth";
import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import "../../../styles/tailwind.css";
import "../../../styles/file-upload-with-preview.css";
import Image from "next/image";
import { Switch } from "@headlessui/react";
// Cloudinary
import { CldUploadButton } from "next-cloudinary";

import { RiAlarmWarningLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
const EditProfile = () => {
  const { userInfo, setUserInfo } = userAppStore();
  const { t } = useTranslation();
  const [MessageAlert, setMessageAlert] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [WhichField, setWhichField] = useState();
  const [ToggleMessageAlert, setToggleMessageAlert] = useState(false);

  const [switchType, setSwitchType] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    email: userInfo?.username,
    phone: userInfo?.phone,
    adresse: userInfo?.adresse,
  });
  const [companyInfo, setCompanyInfo] = useState({
    rc: userInfo?.companyInfo?.rc,
    cnss: userInfo?.companyInfo?.cnss,
    idFiscale: userInfo?.companyInfo?.idFiscale,
    ice: userInfo?.companyInfo?.ice,
  });

  /* State for image */
  const [selectedFile, setSelectedFile] = useState("");
  /* State for image */

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

    setWhichField("");
    return true;
  };

  // Update User
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      !validateField("adresse", userData.adresse, undefined, 2, 255) ||
      (userInfo?.roles[0] === "owner" &&
        !validateField("rc", companyInfo.rc, /^[0-9]{4,10}$/, 4, 10)) ||
      (userInfo?.roles[0] === "owner" &&
        !validateField(
          "idFiscale",
          companyInfo.idFiscale,
          /^[0-9]{5,10}$/,
          5,
          10
        )) ||
      (userInfo?.roles[0] === "owner" &&
        !validateField("cnss", companyInfo.cnss, /^[0-9]{6,10}$/, 6, 10)) ||
      (userInfo?.roles[0] === "owner" &&
        !validateField("ice", companyInfo.ice, /^[0-9]{9,15}$/, 9, 15))
    ) {
      setIsLoading(false);
      return;
    }

    const userExist = await checkUser(userData?.email);
    if (userExist && userExist?.username !== userInfo?.username) {
      setWhichField("email");
      setMessageAlert("Email already exist!");
      setToggleMessageAlert(true);
      setIsLoading(false);
    } else {
      const data = await updateMyProfile(
        userInfo?.id,
        userData,
        companyInfo,
        selectedFile
      );
      if (data?.response?.data?.error) {
        setMessageAlert(data.response.data.message);
        setToggleMessageAlert(true);
        setIsLoading(false);
      } else {
        setUserInfo(data);
        setSelectedFile(null);
        setSuccessMessage("Your profile updated successfully!");
        setToggleMessageAlert(true);
        setEnableEdit(false);
        setIsLoading(false);
      }
    }
  };

  // Switch Type User
  const switchTypeUser = async () => {
    try {
      setIsLoading(true);
      const type = userInfo?.typeUser === "B2C" ? "B2B" : "B2C";
      const data = await changeTypeUser(userInfo?.id, type);
      if (data.status === 200) {
        setSuccessMessage("Request Sent to admin");
        setToggleMessageAlert(true);
        setSwitchType(true);
      }
    } catch (error) {
      setMessageAlert(data.response.data.message);
      setToggleMessageAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = (data) => {
    setSelectedFile(data.info.secure_url);
  };

  return (
    <div className="panel-mobile md:panel">
      <div
        className={`relative mb-2 flex items-center border p-3.5 rounded before:inline-block before:absolute before:top-1/2 before:right-0 before:-mt-2 before:border-r-8 before:border-t-8 before:border-b-8 before:border-t-transparent before:border-b-transparent before:border-r-inherit border-r-[45px] ${
          ToggleMessageAlert ? "block" : "hidden"
        } ${
          MessageAlert !== ""
            ? "text-[#e2a03f] bg-[#fff9ed] border-[#e2a03f]"
            : successMessage !== "" &&
              "text-[#00ab55] bg-[#ddf5f0] border-[#00ab55]"
        }`}
      >
        <span className="absolute -right-9 inset-y-0 text-white w-6 h-6 m-auto">
          <RiAlarmWarningLine size={18} />
        </span>
        <span className="pr-2">
          <strong className="mr-1">
            {MessageAlert !== ""
              ? "Warning!"
              : successMessage !== "" && "Success!"}
          </strong>{" "}
          - {MessageAlert || successMessage}.
        </span>
        <button
          onClick={() => setToggleMessageAlert(false)}
          type="button"
          className="ml-auto hover:opacity-80"
        >
          X
        </button>
      </div>
      <div className="flex justify-end items-center gap-2 ">
        <span className="font-medium">{t("page.profile.enable_editing")}</span>
        <Switch
          checked={enableEdit}
          onChange={setEnableEdit}
          className={`${enableEdit ? "bg-[#4361ee]" : "bg-[#dbdcdf]"}
          relative inline-flex h-[25px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enableEdit ? "translate-x-7" : "translate-x-0"}
            pointer-events-none inline-block h-[21px] w-[21px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
      <form className="space-y-3" onSubmit={(e) => handleUpdate(e)}>
        <div className="flex flex-col">
          <div className="w-1/2">
            <CldUploadButton
              options={{ multiple: false }}
              onUpload={handleUpload}
              uploadPreset="djws3apw"
            >
              <span className="btn btn-info">Upload Profile Picture</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label htmlFor="firstName">{t("label.firstname")}</label>
            <input
              id="firstName"
              type="text"
              className={`form-input disabled:bg-slate-300 ${
                WhichField === "firstName" ? "border-2 border-[#e2a03f]" : ""
              }  `}
              placeholder="Enter First Name"
              value={userData.firstName}
              onChange={(e) =>
                setUserData({ ...userData, [e.target.id]: e.target.value })
              }
              disabled={!enableEdit}
            />
          </div>
          <div>
            <label htmlFor="lastName">{t("label.lastname")}</label>
            <input
              id="lastName"
              type="text"
              className={`form-input disabled:bg-slate-300 ${
                WhichField === "lastName" ? "border-2 border-[#e2a03f]" : ""
              }  `}
              placeholder="Enter Last Name"
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, [e.target.id]: e.target.value })
              }
              disabled={!enableEdit}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label htmlFor="email">{t("label.email")}</label>
            <input
              id="email"
              type="email"
              className={`form-input disabled:bg-slate-300 ${
                WhichField === "email" ? "border-2 border-[#e2a03f]" : ""
              }  `}
              placeholder="Enter Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, [e.target.id]: e.target.value })
              }
              disabled={!enableEdit}
            />
          </div>
          <div>
            <label htmlFor="phone">{t("label.phone")}</label>
            <input
              id="phone"
              type="phone"
              className={`form-input disabled:bg-slate-300 ${
                WhichField === "phone" ? "border-2 border-[#e2a03f]" : ""
              }  `}
              placeholder="Enter phone"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, [e.target.id]: e.target.value })
              }
              disabled={!enableEdit}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div>
            <label htmlFor="adresse">{t("label.adresse")}</label>
            <textarea
              id="adresse"
              value={userData.adresse || ""}
              className={`form-input disabled:bg-slate-300 ${
                WhichField === "adresse" ? "border-2 border-[#e2a03f]" : ""
              }  `}
              placeholder="Enter Adresse"
              onChange={(e) =>
                setUserData({ ...userData, [e.target.id]: e.target.value })
              }
              disabled={!enableEdit}
            />
          </div>
        </div>
        {userInfo?.roles[0] === "owner" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label htmlFor="rc">RC</label>
                <input
                  id="rc"
                  type="text"
                  className={`form-input disabled:bg-slate-300 ${
                    WhichField === "rc" ? "border-2 border-[#e2a03f]" : ""
                  }  `}
                  placeholder="Enter Raison Sociale"
                  value={companyInfo.rc}
                  onChange={(e) =>
                    setCompanyInfo({
                      ...companyInfo,
                      [e.target.id]: e.target.value,
                    })
                  }
                  disabled={!enableEdit}
                />
              </div>
              <div>
                <label htmlFor="cnss">CNSS</label>
                <input
                  id="cnss"
                  type="text"
                  className={`form-input disabled:bg-slate-300 ${
                    WhichField === "cnss" ? "border-2 border-[#e2a03f]" : ""
                  }  `}
                  placeholder="Enter Cnss"
                  value={companyInfo.cnss}
                  onChange={(e) =>
                    setCompanyInfo({
                      ...companyInfo,
                      [e.target.id]: e.target.value,
                    })
                  }
                  disabled={!enableEdit}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label htmlFor="idFiscale">Id Fiscale</label>
                <input
                  id="idFiscale"
                  type="text"
                  className={`form-input disabled:bg-slate-300 ${
                    WhichField === "idFiscale"
                      ? "border-2 border-[#e2a03f]"
                      : ""
                  }  `}
                  placeholder="Enter identifiant fiscale"
                  value={companyInfo.idFiscale}
                  onChange={(e) =>
                    setCompanyInfo({
                      ...companyInfo,
                      [e.target.id]: e.target.value,
                    })
                  }
                  disabled={!enableEdit}
                />
              </div>
              <div>
                <label htmlFor="cnss">ICE</label>
                <input
                  id="ice"
                  type="text"
                  className={`form-input disabled:bg-slate-300 ${
                    WhichField === "ice" ? "border-2 border-[#e2a03f]" : ""
                  }  `}
                  placeholder="Enter Ice"
                  value={companyInfo.ice}
                  onChange={(e) =>
                    setCompanyInfo({
                      ...companyInfo,
                      [e.target.id]: e.target.value,
                    })
                  }
                  disabled={!enableEdit}
                />
              </div>
            </div>
          </>
        )}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!enableEdit}
        >
          {!isLoading ? (
            "Update Profile"
          ) : (
            <BeatLoader loading={isLoading} color="#fff" size={10} />
          )}
        </button>
      </form>
      <div className="mt-5 flex flex-col gap-4">
        <span className="font-bold text-xl">{t("page.profile.settings")}</span>
        <div className="flex items-center gap-2 ">
          <span className="font-bold">
            {t("page.profile.switch_to")}{" "}
            {userInfo?.typeUser === "B2C" ? "B2B" : "B2C"}
          </span>
          <Switch
            checked={switchType}
            onChange={() => switchTypeUser()}
            disabled={isLoading}
            className={`${switchType ? "bg-[#4361ee]" : "bg-[#dbdcdf]"}
          relative inline-flex h-[25px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${switchType ? "translate-x-7" : "translate-x-0"}
            pointer-events-none inline-block h-[23px] w-[23px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
