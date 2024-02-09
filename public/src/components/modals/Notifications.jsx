"use client";
import { useState, useEffect, Fragment } from "react";
import { userAppStore } from "airbnb/store/store";
import { readNotification } from "airbnb/lib/lisitng";
import { formatDistanceToNow } from "date-fns";
import { FaCircle } from "react-icons/fa6";

const Notifications = ({ notification }) => {
  const { userInfo } = userAppStore();

  useEffect(() => {
    const readNot = async () => {
      if (!notification.read) {
        await readNotification(notification.id, true);
      }
    };
    if (userInfo) {
      readNot();
    }
  }, [userInfo]);

  // Function to convert createdAt timestamp to time difference
  const formatCreatedAt = (createdAt) => {
    const distance = formatDistanceToNow(new Date(createdAt), {
      addSuffix: true,
    });
    return distance;
  };

  return (
    <div className="flex gap-3 justify-between items-center w-full rounded-lg p-1 hover:bg-[#e3e4eb]">
      <div className="flex items-start gap-3">
        {notification?.photo ? (
          <img
            className="w-11 h-11 rounded-full overflow-hidden object-cover"
            src={`${notification?.photo}`}
            alt="img"
          />
        ) : (
          <span className="flex justify-center items-center bg-black text-white h-10 w-10 text-xl rounded-full">
            {notification?.title?.split("").shift()?.toUpperCase()}
          </span>
        )}
        <div className="flex flex-col text-sm font-bold">
          <span>{notification?.title}</span>
          <span className="text-gray-600">{notification?.description}</span>
          <span className="text-gray-500 text-xs">
            {formatCreatedAt(notification?.createdAt)}
          </span>
        </div>
      </div>
      <div>{!notification?.read && <FaCircle color="#4361ee" size={8} />}</div>
    </div>
  );
};

export default Notifications;
