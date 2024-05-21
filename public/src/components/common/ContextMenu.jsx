import React, { useEffect, useRef } from "react";

export default function ContextMenu({ options, userInfo }) {
  const handleClick = (e, callBack) => {
    e.stopPropagation();
    callBack();
  };
  return (
    <ul>
      {userInfo?.roles[0] === "owner"
        ? options.map(({ id, icon, name, callBack }) => (
            <li
              className="flex items-center gap-3 p-2 rounded-2xl cursor-pointer hover:bg-[#3b3f5c] hover:text-white text-sm md:text-base font-semibold"
              onClick={(e) => handleClick(e, callBack)}
              key={id}
            >
              <span>{icon}</span>
              <span className="">{name}</span>
            </li>
          ))
        : options
            .filter(
              ({ id }) =>
                id !== "my_listings" &&
                id !== "booking_received" &&
                id !== "add_hall" &&
                id !== "calendar" &&
                id !== "statistics" &&
                id !== "invoices"
            )
            .map(({ id, icon, name, callBack }) => (
              <li
                className="flex items-center gap-3 p-2 rounded-2xl cursor-pointer hover:bg-[#3b3f5c] hover:text-white"
                onClick={(e) => handleClick(e, callBack)}
                key={id}
              >
                <span>{icon}</span>
                <span className="">{name}</span>
              </li>
            ))}
    </ul>
  );
}
