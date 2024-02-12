"use client";
import React, { useEffect, useState } from "react";
import { userAppStore } from "airbnb/store/store";
import Image from "next/image";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { FaStar } from "react-icons/fa";

const InfoProfile = () => {
  // current user
  const { userInfo, setUserInfo } = userAppStore();
  const [loading, setLoading] = useState(true);

  const [timeSinceCreated, setTimeSinceCreated] = useState("");

  useEffect(() => {
    const calculateTimeSinceCreated = () => {
      setLoading(true);
      const createdAtDate = new Date(userInfo?.createdAt);
      const currentDate = new Date();

      const timeDifference = currentDate.getTime() - createdAtDate.getTime();

      const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24 * 365)) /
          (1000 * 60 * 60 * 24 * 30)
      );
      const days = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
      );

      setTimeSinceCreated(
        years > 0
          ? `${years} Years`
          : months > 0
          ? `${months} Months`
          : `${days} Days`
      );
      setLoading(false);
    };

    calculateTimeSinceCreated();
  }, []);

  return (
    <div className="rounded-xl flex flex-col gap-2 px-2 py-8 shadow-lg shadow-neutral-400 border border-neutral-300">
      {loading ? (
        <Skeleton height="100%" />
      ) : (
        <>
          <div className="flex gap-2 justify-center items-center pb-3 border-b border-neutral-200">
            <div
              className="flex flex-col flex-1 justify-center items-center"
              style={{ flexBasis: "60%" }}
            >
              <span>
                {userInfo ? (
                  <>
                    {userInfo?.profileImage !== "" ? (
                      <img
                        className="w-24 h-24 rounded-full overflow-hidden object-cover"
                        src={`${userInfo?.profileImage}`}
                        alt="img"
                      />
                    ) : (
                      <span className="flex justify-center items-center bg-black text-white h-24 w-24 text-4xl font-bold rounded-full">
                        {userInfo?.firstName?.split("").shift()?.toUpperCase()}
                      </span>
                    )}
                  </>
                ) : (
                  <Image
                    src="/empty-profile.png"
                    alt="profile"
                    height={30}
                    width={30}
                  />
                )}
              </span>
              <span className="font-bold text-xl mt-2">
                {userInfo?.lastName}
              </span>
              <span className="font-medium text-sm">
                {userInfo?.roles[0] === "owner" ? "Owner" : "Client"}
              </span>
            </div>
            <div
              className="flex-1 font-semibold text-base"
              style={{ flexBasis: "40%" }}
            >
              {timeSinceCreated}{" "}
              <span className="font-medium text-xs">at Votre Salles</span>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 font-medium">
            <FaStar color="#e2a03f" size={18} /> {"4.5 (112)"}
          </div>
        </>
      )}
    </div>
  );
};

export default InfoProfile;
