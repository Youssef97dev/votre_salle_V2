import Image from "next/image";
import React from "react";

function Overview({ t }) {
  const mainTitle = `${t("page.new_listing.one.big_title")}`;
  const data = [
    {
      title: `${t("page.new_listing.one.title_one")}`,
      description: `${t("page.new_listing.one.subtitle_one")}`,
      image: "/overview1.jpeg",
    },
    {
      title: `${t("page.new_listing.one.title_two")}`,
      description: `${t("page.new_listing.one.subtitle_two")}`,
      image: "/overview22.jpeg",
    },
    {
      title: `${t("page.new_listing.one.title_three")}`,
      description: `${t("page.new_listing.one.subtitle_three")}`,
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
