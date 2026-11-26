"use client";
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});

import { userAppStore } from "airbnb/store/store";
import React, { useEffect, useState } from "react";
import { getSearchListing, getUserListings } from "airbnb/lib/lisitng";
import ListingCard from "airbnb/components/listingCard";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();
  const {
    isAuthModalOpen,
    userInfo,
    setUserListings,
    userListings,
    relaunchData,
  } = userAppStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserListings(userInfo?.id);
      setUserListings(data);
    };
    if (userInfo) {
      getData();
    }
  }, [userInfo, setUserListings, relaunchData]);
  return (
    isClient && (
      <div>
        <Navbar />
        <div className="flex justify-start items-start">
          {userListings.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 medium:grid-cols-3 2lg:grid-cols-4 2xl:grid-cols-5 px-10 gap-3 py-10 w-full  items-start ">
              {userListings?.map((listing, index) => (
                <ListingCard data={listing} key={index} isMyListing />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <h1>{t("page.my_listing.message")}</h1>
            </div>
          )}
        </div>
        <CompactFooter />
        {!isDesktop && <NavbarMobile />}
      </div>
    )
  );
}
