import React, { useEffect, useRef } from "react";

export default function ContextMenu({ options, userInfo }) {
  const handleClick = (e, callBack) => {
    e.stopPropagation();
    callBack();
  };
  return (
    <ul>
      {userInfo?.roles[0] === "owner"
        ? options.map(({ icon, name, callBack }) => (
            <li
              className="flex items-center gap-3 p-2 rounded-2xl cursor-pointer hover:bg-[#3b3f5c] hover:text-white text-sm md:text-base font-semibold"
              onClick={(e) => handleClick(e, callBack)}
              key={name}
            >
              <span>{icon}</span>
              <span className="">{name}</span>
            </li>
          ))
        : options
            .filter(
              ({ name }) =>
                name !== "Manage My Listings" &&
                name !== "Manage My Reservations" &&
                name !== "Add Your Hall" &&
                name !== "Calendar" &&
                name !== "Statistics" &&
                name !== "invoices"
            )
            .map(({ icon, name, callBack }) => (
              <li
                className="flex items-center gap-3 p-2 rounded-2xl cursor-pointer hover:bg-[#3b3f5c] hover:text-white"
                onClick={(e) => handleClick(e, callBack)}
                key={name}
              >
                <span>{icon}</span>
                <span className="">{name}</span>
              </li>
            ))}
    </ul>
  );
}
