"use client";
import { userAppStore } from "airbnb/store/store";
import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import "../../../styles/tailwind.css";
import "../../../styles/file-upload-with-preview.css";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Switch } from "@headlessui/react";

import { IoMdImages } from "react-icons/io";

const EditProfile = () => {

    const { userInfo } = userAppStore();

    const [errorMessage, setErrorMessage] = useState("");
    const [enableEdit, setEnableEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        firstName:userInfo?.firstName,
        lastName:userInfo?.lastName,
        email:userInfo?.username,
        phone:userInfo?.phone,
        companyInfo:{
          rc: userInfo?.companyInfo?.rc,
          cnss: userInfo?.companyInfo?.cnss,
          idFiscale: userInfo?.companyInfo?.idFiscale,
          ice: userInfo?.companyInfo?.ice,
        }
    })

    /* State for image */
    const [selectedFile, setSelectedFile] = useState(null);
    const [images, setImages] = useState([]);
    const maxNumber = 69;
    /* State for image */

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

  return (
    <div className="panel-mobile md:panel">
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
                      className={`${
                        enableEdit ? "translate-x-7" : "translate-x-0"
                      }
            pointer-events-none inline-block h-[21px] w-[21px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
        </div>
        <form className="space-y-3" /*onSubmit={(e) => handleSignup(e)}*/>
          <div className="panel custom-file-container" data-upload-id="myFirstImage">
            <div className="label-container">
              <label>Upload image </label>
                <button type="button" className="custom-file-container__image-clear" title="Clear Image"
                  onClick={() => {
                    setImages([]);
                  }}
                >
                  ×
                </button>
            </div>
            <div className="panel border border-slate-400">
            <label className="custom-file-container__custom-file"></label>
            <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
            <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
              <ImageUploading value={images} onChange={handleImageUpload} maxNumber={maxNumber} >
                {({ imageList, onImageUpload }) => (
                  <div className="upload__image-wrapper">
                    <button type="button" className="custom-file-container__custom-file__custom-file-control h-full flex justify-center" onClick={onImageUpload} >
                      <IoMdImages size={45} />
                    </button>
                    &nbsp;
                    {imageList.map((image, index) => (
                      <div key={index} className="custom-file-container__image-preview relative" >
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
                className="form-input disabled:bg-slate-300"
                placeholder="Enter First Name"
                value={userData.firstName}
                onChange={(e) => setUserData({...userData, [e.target.id]: e.target.value})}
                disabled={!enableEdit}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                className="form-input disabled:bg-slate-300"
                placeholder="Enter Last Name"
                value={userData.lastName}
                onChange={(e) => setUserData({...userData, [e.target.id]: e.target.value})}
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
                className="form-input disabled:bg-slate-300"
                placeholder="Enter Email"
                value={userData.email}
                onChange={(e) => setUserData({...userData, [e.target.id]: e.target.value})}
                disabled={!enableEdit}
                />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input
                id="phone"
                type="phone"
                className="form-input disabled:bg-slate-300"
                placeholder="Enter phone"
                value={userData.phone}
                onChange={(e) => setUserData({...userData, [e.target.id]: e.target.value})}
                disabled={!enableEdit}
                />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div>
                <label htmlFor="adresse">Adresse</label>
                <textarea
                id="adresse"
                className="form-input disabled:bg-slate-300"
                placeholder="Enter Adresse"
                //onChange={(e) => setUserData({...userData, [e.target.id]: e.target.value})}
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
                className="form-input disabled:bg-slate-300"
                placeholder="Enter Raison Sociale"
                value={userData.companyInfo.rc}
                onChange={(e) => setUserData({...userData, userData : { companyInfo : {[e.target.id]: e.target.value}}})}
                disabled={!enableEdit}
              />
            </div>
            <div>
              <label htmlFor="cnss">CNSS</label>
              <input
                id="cnss"
                type="text"
                className="form-input disabled:bg-slate-300"
                placeholder="Enter Cnss"
                value={userData.companyInfo.cnss}
                onChange={(e) => setUserData({...userData, userData : { companyInfo : {[e.target.id]: e.target.value}}})}
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
                className="form-input disabled:bg-slate-300"
                placeholder="Enter identifiant fiscale"
                value={userData.companyInfo.idFiscale}
                onChange={(e) => setUserData({...userData, userData : { companyInfo : {[e.target.id]: e.target.value}}})}
                disabled={!enableEdit}
              />
            </div>
            <div>
              <label htmlFor="cnss">ICE</label>
              <input
                id="ice"
                type="text"
                className="form-input disabled:bg-slate-300"
                placeholder="Enter Ice"
                value={userData.companyInfo.ice}
                onChange={(e) => setUserData({...userData, userData : { companyInfo : {[e.target.id]: e.target.value}}})}
                disabled={!enableEdit}
              />
            </div>
          </div>
            </>
          )}
          <button type="submit" className="btn btn-primary w-full" disabled={!enableEdit} >
            {!isLoading ? (
              "Update Profile"
            ) : (
              <BeatLoader loading={isLoading} color="#fff" size={10} />
            )}
          </button>
        </form>
    </div>
  )
}

export default EditProfile