import React, { useEffect, useRef } from "react";

export default function ContextMenu({
  options,
  userInfo,
}) {

  const handleClick = (e, callBack) => {
    e.stopPropagation();
    callBack();
  };
  return (
      <ul>
        {userInfo?.roles[0] === "owner"
          ? options.map(({ name, callBack }) => (
              <li
                className="hover:bg-[#3b3f5c] hover:text-white rounded-2xl pl-5 pr-10  py-2 cursor-pointer"
                onClick={(e) => handleClick(e, callBack)}
                key={name}
              >
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
              .map(({ name, callBack }) => (
                <li
                  className="hover:bg-gray-100 pl-5 pr-10  py-2 cursor-pointer"
                  onClick={(e) => handleClick(e, callBack)}
                  key={name}
                >
                  <span className="">{name}</span>
                </li>
              ))}
      </ul>
  );
}
