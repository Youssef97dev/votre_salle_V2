import Link from "next/link";
import React, { useState } from "react";
import { PiCaretUpBold } from "react-icons/pi";
import { FiGlobe } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

export default function CompactFooter() {
  const [lang, setLang] = useState(i18n.language);
  const { t } = useTranslation();
  const links = [
    `${t("footer.privacy")}`,
    `${t("footer.terms")}`,
    `${t("footer.sitemap")}`,
    `${t("footer.company_details")}`,
    `${t("footer.destinations")}`,
  ];

  const changeLanguage = () => {
    localStorage.removeItem("lang");
    if (i18n.language === "fr") {
      i18n.changeLanguage("en");
      localStorage.setItem("lang", "en");
      setLang("en");
    } else {
      i18n.changeLanguage("fr");
      localStorage.setItem("lang", "fr");
      setLang("fr");
    }
    console.log(i18n.language);
  };

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
        <li
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => changeLanguage()}
        >
          <FiGlobe />
          {lang === "fr" ? "English (En)" : "French (Fr)"}
        </li>
        <li className="cursor-pointer">MAD</li>
        <li className="flex items-center gap-2 cursor-pointer">
          Support & resources
        </li>
      </ul>
    </div>
  );
}
