"use client";
import { userAppStore } from "airbnb/store/store";
import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import "../../../styles/tailwind.css";
import "../../../styles/file-upload-with-preview.css";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Switch } from "@headlessui/react";

const EditProfile = () => {

    const { userInfo } = userAppStore();

    const [enableEdit, setEnableEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        firstName:userInfo?.firstName,
        lastName:userInfo?.lastName,
        email:userInfo?.username,
        phone:userInfo?.phone,
    })
  return (
    <div className="panel">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                className="form-input"
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
                className="form-input"
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
                className="form-input"
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
                className="form-input"
                placeholder="Enter phone"
                value={userData.phone}
                onChange={(e) => setUserData({...userData, [e.target.id]: e.target.value})}
                disabled={!enableEdit}
                />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full">
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