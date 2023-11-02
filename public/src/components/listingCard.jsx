"use client";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  addToWishList,
  deleteListingAPI,
  removeFromWishListAPI,
} from "airbnb/lib/lisitng";
import { userAppStore } from "airbnb/store/store";
import { IoMdHeart } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function ListingCard({
  data,
  isMyListing = false,
  isWishList = false,
  wishListId = undefined,
}) {
  const {
    removeUserListing,
    userInfo,
    wishLists,
    addToWishListSlice,
    wishListsPage,
    setWishListsPage,
  } = userAppStore();
  const pathname = usePathname();

  const [hover, setHover] = useState(false);

  const router = useRouter();
  const deleteListing = async () => {
    await deleteListingAPI(data?.id);
    removeUserListing(data.id);
  };

  const addWishList = async () => {
    await addToWishList(data.id, userInfo?.id);
    addToWishListSlice(data.id);
  };

  const removeWishlist = async () => {
    // const id = wishLists.find((list) => console.log(list));
    // await removeFromWishListAPI(id.id);
  };

  const deleteWishList = async () => {
    await removeFromWishListAPI(wishListId);
    const index = wishListsPage.findIndex((list) => list.id === wishListId);
    if (index !== -1) {
      wishListsPage.splice(index, 1);
      setWishListsPage(wishListsPage);
    }
  };

  return (
    <div className="col-span-1 group">
      <div
        className="flex flex-col gap-2 w-full"
        onClick={() => router.push(`/listing/${data.id}`)}
      >
        <div className="">
          <div
            className="swiper aspect-square w-full relative overflow-hidden rounded-xl mb-3"
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            id={`slider${data.id}`}
          >
            <div className="swiper-wrapper">
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                navigation={{
                  nextEl: `.swiper-button-next-${data.id}`,
                  prevEl: `.swiper-button-prev-${data.id}`,
                }}
                pagination={{
                  clickable: true,
                  type: "bullets",
                }}
              >
                {data?.photos?.map((photo, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={photo}
                      className="rounded-lg object-cover h-full w-full group-hover:scale-110 transition"
                      alt="slide1"
                    />
                    {pathname === "/" && userInfo && (
                      <div className="absolute z-20 right-2 top-2">
                        <IoMdHeart
                          style={{ stroke: "white", strokeWidth: "40" }}
                          className={`text-3xl ${
                            wishLists?.includes(data.id)
                              ? "text-[#FF385C]"
                              : "text-[#00000099]"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (wishLists?.includes(data.id)) {
                              removeWishlist();
                            } else addWishList();
                          }}
                        />
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <button
              onClick={(e) => e.stopPropagation()}
              className={`swiper-button-prev-${data.id} ${
                hover ? "block" : "hidden"
              } place-content-center left-2  p-1 transition text-primary hover:text-white border border-primary  hover:border-primary  bg-[#fff] rounded-full absolute z-[50] top-1/2 -translate-y-1/2`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-w-4 rtl:-rotate-90 rotate-90"
              >
                <path
                  d="M19 9L12 15L5 9"
                  stroke="#000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className={`swiper-button-next-${data.id} ${
                hover ? "block" : "hidden"
              } place-content-center right-2  p-1 transition text-primary hover:text-white border border-primary  hover:border-primary bg-[#fff] rounded-full absolute z-[50] top-1/2 -translate-y-1/2`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-w-4 rtl:rotate-90 -rotate-90"
              >
                <path
                  d="M19 9L12 15L5 9"
                  stroke="#000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <h3 className="font-semibold">{data.title}</h3>
            <h4 className="font-light mb-2">{data.locationType}</h4>
            <span className="font-medium">
              {userInfo?.typeUser === "B2B" ? data.priceB2b : data.price} MAD
            </span>{" "}
            <span className="font-light">day</span>
          </div>
        </div>
      </div>
      {isMyListing && (
        <button
          className="bg-airbnb-gradient py-3 mt-5  px-5 text-white text-base font-medium rounded-md cursor-pointer w-full"
          onClick={deleteListing}
        >
          Delete
        </button>
      )}
      {isWishList && (
        <button
          className="bg-airbnb-gradient py-3 mt-1 mb-3  px-5 text-white text-base font-medium rounded-md cursor-pointer w-full"
          onClick={deleteWishList}
        >
          Delete
        </button>
      )}
    </div>
  );
}
