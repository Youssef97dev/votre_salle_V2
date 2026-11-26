"use client";
import React, { useState } from "react";
import ImageUpload from "../common/ImageUpload";
import { userAppStore } from "airbnb/store/store";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

export default function Photos({ t }) {
  const { photos, setPhotos } = userAppStore();
  const handleUpload = (data) => {
    setPhotos([...photos, data.info.secure_url]);
  };
  return (
    <div className="flex flex-col gap-6 p-2 md:p-6 w-full h-full rounded-lg">
      <div className="pb-5 border-b border-[#dbdcdf] w-fit">
        <h2 className="font-extrabold text-2xl">
          {t("page.new_listing.eight.title")}
        </h2>
        <span className="text-sm">{t("page.new_listing.eight.subtitle")}</span>
      </div>
      <CldUploadButton
        options={{ multiple: true }}
        onUpload={handleUpload}
        uploadPreset="w8cxaaws"
      >
        <span className="bg-airbnb-gradient py-2 md:py-3 mt-5 px-4 md:px-5 text-white text-xs md:text-base font-bold rounded-lg cursor-pointer">
          {t("page.new_listing.eight.upload")}
        </span>
      </CldUploadButton>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-4 h-[55vh] overflow-auto pb-10">
        {photos.map((photo) => (
          <div className="relative h-28 w-[150px]" key={photo}>
            <Image src={photo} fill alt="upload" />
          </div>
        ))}
      </div>
    </div>
  );
}
