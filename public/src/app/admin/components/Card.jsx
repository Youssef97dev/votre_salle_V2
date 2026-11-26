// Libs
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

// APIs
import { getCount } from "airbnb/lib/admin";

// Store
import { userAppStore } from "airbnb/store/store";

const Card = ({ title, color, icon, titleLink }) => {
  const { userInfo } = userAppStore();

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // Get Card data
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getCount(titleLink);
      if (title === "Owners") {
        const ownersCount = data?.filter((user) => user.roles[0] === "owner");
        setCount(ownersCount?.length);
      } else if (title === "Clients") {
        const clientsCount = data?.filter((user) => user.roles[0] === "user");
        setCount(clientsCount?.length);
      } else {
        setCount(data?.length);
      }
      setLoading(false);
    };
    if (userInfo) {
      getData();
    }
  }, []);

  return (
    <div className="panel flex justify-between items-center border border-gray-400 !shadow-md">
      {loading ? (
        <PuffLoader size={35} color={color} />
      ) : (
        <>
          <div className="flex flex-col justify-between space-y-2">
            <span className={`font-extrabold text-xl text-[${color}]`}>
              {count}
            </span>
            <span className="text-gray-500 font-bold">{title}</span>
          </div>
          {icon}
        </>
      )}
    </div>
  );
};

export default Card;
