"use client";
import React, { useState } from "react";
import ImageUpload from "../common/ImageUpload";
import { userAppStore } from "airbnb/store/store";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

export default function Photos() {
  const { photos, setPhotos } = userAppStore();
  const handleUpload = (data) => {
    setPhotos([...photos, data.info.secure_url]);
  };
  return (
    <div className="flex gap-5 items-center justify-center flex-col h-full">
      <h2 className="font-semibold text-lg md:text-3xl lg:text-4xl">Add some photos of your house</h2>
      <p className="text-xs md:text-base mx-2">
        You'll need 5 photos to get started. You can add more or make changes
        later.
      </p>
      <CldUploadButton
        options={{ multiple: true }}
        onUpload={handleUpload}
        uploadPreset="a1wvb4ge"
      >
        <span className="bg-airbnb-gradient py-2 md:py-3 mt-5 px-4 md:px-5 text-white text-xs md:text-base font-medium rounded-md cursor-pointer">
          Upload
        </span>
      </CldUploadButton>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4 h-[55vh] overflow-auto pb-10 no-scrollbar">
        {photos.map((photo) => (
          <div className="relative h-36 w-[200px]" key={photo}>
            <Image src={photo} fill alt="upload" />
          </div>
        ))}
      </div>
    </div>
  );
}
