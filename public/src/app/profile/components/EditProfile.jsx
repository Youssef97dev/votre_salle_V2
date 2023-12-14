"use client";
import { userAppStore } from "airbnb/store/store";
import { updateMyProfile, deleteImage } from "airbnb/lib/lisitng";
import { checkUser } from "airbnb/lib/auth";
import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import "../../../styles/tailwind.css";
import "../../../styles/file-upload-with-preview.css";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Switch } from "@headlessui/react";

import { IoMdImages } from "react-icons/io";
import { RiAlarmWarningLine } from "react-icons/ri";

const EditProfile = () => {
  const { userInfo, setUserInfo } = userAppStore();

  const [MessageAlert, setMessageAlert] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [WhichField, setWhichField] = useState();
  const [ToggleMessageAlert, setToggleMessageAlert] = useState(false);

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);
  const maxNumber = 69;
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

  // Callback to handle file selection
  const handleImageUpload = (imageList, addUpdateIndex) => {
    setImages(imageList);
    const uploadedFile = imageList ? imageList[0]?.file : null;
    if (uploadedFile) {
      // Get the current timestamp
      const timestamp = Date.now();

      // Create a new File object with the updated name
      const renamedFile = new File(
        [uploadedFile],
        timestamp + "-" + uploadedFile.name,
        {
          type: uploadedFile.type,
          lastModified: uploadedFile.lastModified,
        }
      );

      setSelectedFile(renamedFile);
    }
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
        !validateField("ice", companyInfo.ice, /^[0-9]{9,10}$/, 9, 10))
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
        if (userInfo?.profileImage !== null && selectedFile !== null) {
          const deletedImage = await deleteImage(userInfo?.profileImage);
          console.log("deletedImage: ", deletedImage);
        }
        setUserInfo(data);
        setImages([]);
        setSelectedFile(null);
        setSuccessMessage("Your profile updated successfully!");
        setToggleMessageAlert(true);
        setEnableEdit(false);
        setIsLoading(false);
      }
    }
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
        <span className="font-medium">Enable Editing</span>
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
        <div
          className="panel custom-file-container"
          data-upload-id="myFirstImage"
        >
          <div className="label-container">
            <label>Upload image </label>
            <button
              type="button"
              className="custom-file-container__image-clear"
              title="Clear Image"
              onClick={() => {
                setImages([]);
              }}
            >
              ×
            </button>
          </div>
          <div className="panel border border-slate-400">
            <label className="custom-file-container__custom-file"></label>
            <input
              type="file"
              className="custom-file-container__custom-file__custom-file-input"
              accept="image/*"
            />
            <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
            <ImageUploading
              value={images}
              onChange={handleImageUpload}
              maxNumber={maxNumber}
            >
              {({ imageList, onImageUpload }) => (
                <div className="upload__image-wrapper">
                  <button
                    type="button"
                    className="custom-file-container__custom-file__custom-file-control h-full flex justify-center"
                    onClick={onImageUpload}
                  >
                    <IoMdImages size={45} />
                  </button>
                  &nbsp;
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className="custom-file-container__image-preview relative"
                    >
                      <img src={image.dataURL} alt="img" className="m-auto" />
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label htmlFor="firstName">First Name</label>
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
            <label htmlFor="lastName">Last Name</label>
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
            <label htmlFor="email">Email</label>
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
            <label htmlFor="phone">Phone</label>
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
            <label htmlFor="adresse">Adresse</label>
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
    </div>
  );
};

export default EditProfile;
