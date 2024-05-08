"use client";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import NavbarMobile from "airbnb/components/navbar/NavbarMobile";
const Navbar = dynamic(() => import("airbnb/components/navbar/Navbar"), {
  ssr: false,
});

import ListView from "airbnb/components/views/ListView";
import MapView from "airbnb/components/views/MapView";
import ViewSwitchBadge from "airbnb/components/views/ViewSwitchBadge";
import { me } from "airbnb/lib/auth";
import {
  getAllListings,
  getUserWishlists,
  SendEmailVerification,
} from "airbnb/lib/lisitng";
import { userAppStore } from "airbnb/store/store";
import dynamic from "next/dynamic";
import React, { useEffect, useState, useMemo } from "react";
import { useMediaQuery } from "airbnb/hooks/useMediaQuery";

import Filter from "airbnb/components/modals/Filter";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import SwiperCategories from "airbnb/components/common/SwiperCategories";

//import { debounce } from "lodash";

export default function Home() {
  const MySwal = withReactContent(Swal);
  const [locationType, setLocationType] = useState("All");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [showFilter, setShowFilter] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  //const [page, setPage] = useState(1);
  const {
    setUserInfo,
    setListings,
    isMapView,
    userInfo,
    setWishLists,
    setSearchLocation,
    setMaxValueRange,
    setMinValueRange,
    discardSearch,
    setLoadingUser,
    setLoadingData,
    filter,
    listings,
  } = userAppStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      setSearchLocation(undefined);
      setLoadingUser(true);
      const data = await me();
      setUserInfo(data);
      setLoadingUser(false);
    };
    getUser();
  }, [setUserInfo]);

  const fetchListings = async () => {
    try {
      setLoadingData(true);
      const { data, maxPrice, minPrice, error } = await getAllListings(
        locationType,
        userInfo?.typeUser
      );
      if (error) {
        console.log(error);
        return;
      }
      if (data?.length === 0) {
        setIsEnd(true);
        return;
      }

      setListings([...data]);
      setMaxValueRange(maxPrice);
      setMinValueRange(minPrice);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    console.log(locationType);
    fetchListings();
  }, [userInfo?.id, locationType]);

  useEffect(() => {
    const getWishlists = async () => {
      setLoadingData(true);
      const wishlists = await getUserWishlists(userInfo?.id);
      const wishListsId = wishlists?.map(({ listing }) => listing.id);
      setWishLists(wishListsId);
      setLoadingData(false);
    };
    getWishlists();
  }, [userInfo?.id, discardSearch]);

  const showMessage = (message) => {
    MySwal.fire({
      title: message,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      showCloseButton: true,
      background: "#3b3f5c",
      color: "#fff",
    });
  };

  const resendVerificationEmail = async () => {
    const result = await SendEmailVerification(userInfo?.id);
    if (result.status === 201) {
      showMessage(result.data.message);
    } else {
      showMessage("Email not sent.");
    }
  };

  const countTrueValues = useMemo(() => {
    let count = 0;
    let hasSpecial = false;

    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        if (key === "coffe" || key === "lunch" || key === "dinner") {
          if (!hasSpecial) {
            hasSpecial = true;
            count += 1;
          }
        } else {
          count += 1;
        }
      }
    });

    return count;
  }, [filter]);

  /*const handleScroll = debounce((e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    console.log(page);

    if (!isEnd && offsetHeight + scrollTop >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
      console.log(page);
    }
  }, 200);*/

  return (
    isClient && (
      <div className="max-h-[100vh] h-[100vh]">
        <Navbar />
        <SwiperCategories
          countTrueValues={countTrueValues}
          setLocationType={setLocationType}
          setShowFilter={setShowFilter}
        />
        {userInfo && !userInfo.isVerified && (
          <div className="flex justify-start items-center mt-3 mx-3 md:mx-20 p-3.5 rounded text-[#fff] bg-[#e2a03f]">
            <span className="pr-2">
              <strong className="mr-1">Votre compte n'est pas vérifier.</strong>
            </span>
            <button
              type="button"
              onClick={() => resendVerificationEmail()}
              className="hover:opacity-80"
            >
              Resend the code
            </button>
          </div>
        )}
        {isMapView ? <MapView /> : <ListView />}
        <ViewSwitchBadge />
        <CompactFooter />
        {!isDesktop && <NavbarMobile />}
        {showFilter && (
          <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
        )}
      </div>
    )
  );
}
