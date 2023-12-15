import Image from "next/image";
import React from "react";

function Overview() {
  const mainTitle = "It’s easy to get started on Votre Salles";
  const data = [
    {
      title: "Tell us about your place",
      description:
        "Share some basic info, such as where it is and how many guests.",
      image: "/overview1.jpeg",
    },
    {
      title: "Make it stand out",
      description:
        "Add 5 or more photos plus a title and description – we’ll help you out.",
      image: "/overview22.jpeg",
    },
    {
      title: "Finish up and publish",
      description:
        "Set a starting price for B2C and B2B and publish your listing.",
      image: "/overview3.png",
    },
  ];
  return (
    <div className="flex flex-col gap-6 p-6 w-full h-full rounded-lg">
      <h2 className="font-extrabold text-2xl pb-5 border-b border-[#dbdcdf] w-fit text-airbnb-light-black">
        {mainTitle}
      </h2>
      <ul className="flex flex-col gap-10">
        {data.map(({ description, image, title }, index) => (
          <li key={title} className="flex items-start justify-start gap-5">
            <strong className="pt-5 text-airbnb-light-black">
              <h3>{index + 1}</h3>
            </strong>
            <div className="pt-5">
              <strong className=" text-airbnb-light-black">
                <h3>{title}</h3>
              </strong>
              <p className="text-airbnb-light-gray">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Overview;
