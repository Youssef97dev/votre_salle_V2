"use client";
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
import ListingCard from "airbnb/components/listingCard";
import { getUserWishlists } from "airbnb/lib/lisitng";
import { userAppStore } from "airbnb/store/store";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();
  const { isAuthModalOpen, userInfo, wishListsPage, setWishListsPage } =
    userAppStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    console.log(wishListsPage);
    const getData = async () => {
      const wishlists = await getUserWishlists(userInfo?.id);
      setWishListsPage(wishlists);
    };
    getData();
    // const wishListsId = wishlists.map(({ listing }) => listing.id);
    // setWishLists(wishListsId);
  }, []);
  return (
    <div>
      <Navbar />
      <div className="h-[82.5vh] flex justify-start items-start">
        {wishListsPage?.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 medium:grid-cols-3 2lg:grid-cols-4 2xl:grid-cols-5 px-10 gap-3 py-10 h-[75vh] overflow-auto no-scrollbar w-full items-start ">
            {wishListsPage?.map(({ listing, id }, index) => (
              <ListingCard
                data={listing}
                key={index}
                isWishList
                wishListId={id}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <h1>{t("page.my_wishlist.message")}</h1>
          </div>
        )}
      </div>
      <CompactFooter />
      {!isDesktop && <NavbarMobile />}
    </div>
  );
}
