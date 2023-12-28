"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  addToWishList,
  deleteListingAPI,
  removeFromWishListAPI,
  addToNotification,
} from "airbnb/lib/lisitng";
import { userAppStore } from "airbnb/store/store";
import { IoMdHeart, IoMdStar } from "react-icons/io";
import { Tb360View } from "react-icons/tb";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Prestation from "./prestation/Prestation";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Visite from "airbnb/components/modals/Visite";

import { MdEditSquare } from "react-icons/md";

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
    loadingUser,
    loadingData,
  } = userAppStore();
  const pathname = usePathname();

  const [hover, setHover] = useState(false);
  const [showVisite, setShowVisite] = useState(false);
  const [showPrestation, setShowPrestation] = useState(false);
  const [rating, setRating] = useState(0);

  const router = useRouter();
  const deleteListing = async () => {
    await deleteListingAPI(data?.id);
    removeUserListing(data.id);
  };

  const addWishList = async () => {
    await addToWishList(data.id, userInfo?.id);
    addToWishListSlice(data.id);
    await addToNotification(
      `${userInfo?.firstName} ${userInfo?.lastName}`,
      `Add your hall ${data.title} to favourite`,
      userInfo?.profileImage,
      false,
      data?.listingCreatedBy?.id
    );
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

  useEffect(() => {
    // Calculate the total ratings and the number of reviews
    const totalRatings = data?.reviews?.reduce(
      (sum, review) => sum + parseFloat(review.ratings),
      0
    );
    const numberOfReviews = data?.reviews?.length;
    // Calculate the average rating
    const averageRating = totalRatings / numberOfReviews;
    setRating(averageRating);
  }, []);

  return (
    <div className="col-span-1 group panel-home">
      <div
        className="flex flex-col gap-2 w-full"
        onClick={() => router.push(`/listing/${data.id}`)}
      >
        <div
          className="swiper aspect-square w-full relative overflow-hidden rounded-xl mb-3"
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          id={`slider${data.id}`}
        >
          {loadingUser || loadingData ? (
            <Skeleton height="100%" />
          ) : (
            <>
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
                        <>
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
                        </>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {pathname === "/" && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVisite(true);
                  }}
                  className="absolute z-20 right-2 bottom-2 rounded-full p-2 bg-[#31247975]"
                >
                  <Tb360View
                    style={{ stroke: "white" }}
                    className={`text-4xl text-[#00000099]`}
                    size={22}
                  />
                </div>
              )}
              {pathname === "/my-listings" && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/new-listing?listingId=${data.id}`);
                  }}
                  className="absolute z-20 right-2 top-2 rounded-full p-2 bg-[#02020280]"
                >
                  <MdEditSquare color="#fff" className={`text-4xl`} size={15} />
                </div>
              )}

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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </>
          )}
        </div>
        <div>
          <div className="flex gap-2 justify-between items-center">
            {loadingUser || loadingData ? (
              <Skeleton />
            ) : (
              <>
                <h3 className="font-bold">{data.title}</h3>
                {rating > 0 && (
                  <span className="font-bold flex items-center gap-2">
                    <IoMdStar size={15} /> {rating.toFixed(1)}
                  </span>
                )}
              </>
            )}
          </div>
          {loadingUser || loadingData ? (
            <Skeleton />
          ) : (
            <h4 className="font-light mb-2">{data.locationType}</h4>
          )}
          {loadingUser || loadingData ? (
            <Skeleton />
          ) : (
            <>
              <span className="font-semibold">
                {userInfo?.typeUser === "B2B" ? data.priceB2b : data.price} MAD
              </span>{" "}
              <span className="font-light">/ day</span>
            </>
          )}
        </div>
      </div>
      {isMyListing && (
        <div className="flex gap-2">
          <button
            className="bg-airbnb-gradient py-3 mt-5  px-5 text-white text-base font-medium rounded-md cursor-pointer w-full"
            onClick={deleteListing}
          >
            Delete
          </button>
          <button
            className="bg-airbnb-gradient py-3 mt-5  px-5 text-white text-base font-medium rounded-md cursor-pointer w-full"
            //onClick={() => router.push(`/prestation/${data.id}`)}
            onClick={() => setShowPrestation(true)}
          >
            Prestation
          </button>
        </div>
      )}
      {isWishList && (
        <button
          className="bg-airbnb-gradient py-3 mt-1 mb-3  px-5 text-white text-base font-medium rounded-md cursor-pointer w-full"
          onClick={deleteWishList}
        >
          Delete
        </button>
      )}
      {/* Search popup */}
      {showPrestation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
          <Prestation data={data} setShowPrestation={setShowPrestation} />
        </div>
      )}

      {/* show viste popup */}
      {showVisite && (
        <Visite
          showVisite={showVisite}
          setShowVisite={setShowVisite}
          data={data}
        />
      )}
    </div>
  );
}
