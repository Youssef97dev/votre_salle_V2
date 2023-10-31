import Link from "next/link";
import React from "react";
import { PiCaretUpBold } from "react-icons/pi";
import { FiGlobe } from "react-icons/fi";

export default function CompactFooter() {
  const links = [
    "privacy",
    "terms",
    "sitemap",
    "company details",
    "destinations",
  ];
  return (
    <div className=" px-5 md:px-10 lg:px-20 border-t border-t-gray-200 py-4 flex justify-between w-full text-sm z-50 bg-white items-center">
      <ul className="flex lg:flex-row flex-col gap-3 font-normal ">
        <li>&copy; {new Date().getFullYear()} Votre salles, Inc .</li>
        {links.map((link) => (
          <li key={link}>
            <Link href="#">
              {link.charAt(0).toUpperCase() + link.slice(1).toLowerCase()}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex lg:flex-row flex-col gap-4 font-medium">
        <li className="flex items-center gap-2 cursor-pointer">
          <FiGlobe /> English (IN)
        </li>
        <li className="cursor-pointer">MAD</li>
        <li className="flex items-center gap-2 cursor-pointer">
          Support & resources
        </li>
      </ul>
    </div>
  );
}
