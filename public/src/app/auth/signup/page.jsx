"use client";
import Link from "next/link";
import { userAppStore } from "airbnb/store/store";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { checkUser, signup, signupWithGoogle } from "airbnb/lib/auth";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import "../../../styles/tailwind.css";
import "../../../styles/file-upload-with-preview.css";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { RiAlarmWarningLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const page = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { setIsLoggedIn, setUserInfo } = userAppStore();

  const [MessageAlert, setMessageAlert] = useState("");
  const [WhichField, setWhichField] = useState();
  const [ToggleMessageAlert, setToggleMessageAlert] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [role, setRole] = useState("user");
  const [companyInfo, setCompanyInfo] = useState({
    rc: "",
    cnss: "",
    idFiscale: "",
    ice: "",
  });
  const [loadingSend, setLoadingSend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const signUpWithGoogle = async () => {
    window.open(
      `${process.env.NEXT_PUBLIC_API_FRONT_URI}/api/auth/google/callback`,
      "_blank"
    );
  };

  const validateField = (field, value, regex, minLength, maxLength) => {
    setWhichField(field);

    if (minLength && value.length < minLength) {
      setMessageAlert(
        `Please check ${field}. It must contain at least ${minLength} characters.`
      );
      setToggleMessageAlert(true);
      return false;
    }
    if (maxLength && value.length > maxLength) {
      setMessageAlert(
        `Please check ${field}. It must not exceed ${maxLength} characters.`
      );
      setToggleMessageAlert(true);
      return false;
    }
    if (regex && !regex.test(value)) {
      setMessageAlert(`Please check ${field}.`);
      setToggleMessageAlert(true);
      return false;
    }

    return true;
  };

  // Callback to handle file selection
  const handleImageUpload = (imageList, addUpdateIndex) => {
    setImages(imageList);
    const uploadedFile = imageList ? imageList[0]?.file : null;
    if (uploadedFile) {
      // Get the current timestamp
      const timestamp = Date.now();

      // Create a new File object with the updated name
      const renamedFile = new File(
        [uploadedFile],
        timestamp + "-" + uploadedFile.name,
        {
          type: uploadedFile.type,
          lastModified: uploadedFile.lastModified,
        }
      );

      setSelectedFile(renamedFile);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoadingSend(true);
    if (
      !validateField("firstName", firstName, undefined, 2, 50) ||
      !validateField("lastName", lastName, undefined, 2, 50) ||
      !validateField(
        "email",
        email,
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        undefined,
        255
      ) ||
      !validateField(
        "phone",
        phone,
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        10,
        18
      ) ||
      !validateField("password", password, /[A-Z]/, 8) ||
      !validateField("password", password, /[a-z]/) ||
      !validateField("password", password, /\d/) ||
      !validateField("password", password, /[!@#$%&*=]/)
    ) {
      setLoadingSend(false);
      return;
    }

    const data = await signup(
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
      companyInfo,
      selectedFile
    );
    if (data?.response?.data?.error) {
      setErrorMessage(data.response.data.message);
      setLoadingSend(false);
    } else {
      setUserInfo(data);
      setIsLoggedIn(true);
      router.push("/");
      setLoadingSend(false);
    }
  };

  return (
    isClient && (
      <div className="flex min-h-screen items-center justify-center bg-[url('/map.svg')] bg-cover bg-center">
        <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
          {errorMessage !== "" && (
            <div className="flex items-center p-3.5 my-2 rounded text-[#e2a03f] bg-[#fff9ed]">
              <span className="pr-2">
                <strong className="mr-1">Warning!</strong>
                <span>{errorMessage}.</span>
              </span>
              <button
                onClick={() => setErrorMessage("")}
                type="button"
                className="ml-auto hover:opacity-80"
              >
                X
              </button>
            </div>
          )}
          <div
            className={`relative mb-2 flex items-center border p-3.5 rounded before:inline-block before:absolute before:top-1/2 before:right-0 before:-mt-2 before:border-r-8 before:border-t-8 before:border-b-8 before:border-t-transparent before:border-b-transparent before:border-r-inherit text-[#e2a03f] bg-[#fff9ed] border-[#e2a03f] border-r-[45px] ${
              ToggleMessageAlert ? "block" : "hidden"
            }`}
          >
            <span className="absolute -right-9 inset-y-0 text-white w-6 h-6 m-auto">
              <RiAlarmWarningLine size={18} />
            </span>
            <span className="pr-2">
              <strong className="mr-1">Warning!</strong> - {MessageAlert}.
            </span>
            <button
              onClick={() => setToggleMessageAlert(false)}
              type="button"
              className="ml-auto hover:opacity-80"
            >
              X
            </button>
          </div>
          <h2 className="mb-3 text-2xl font-bold">{t("auth.signup")}</h2>
          <p className="mb-7">{t("auth.label_up")}</p>
          <form className="space-y-3" onSubmit={(e) => handleSignup(e)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label htmlFor="firstName">{t("auth.firstname")}</label>
                <input
                  id="firstName"
                  type="text"
                  className={`form-input ${
                    WhichField === "firstName"
                      ? "border-2 border-[#e2a03f]"
                      : ""
                  }  `}
                  placeholder={`${t("auth.enter")} ${t("auth.firstname")}`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastName">{t("auth.lastname")}</label>
                <input
                  id="lastName"
                  type="text"
                  className={`form-input ${
                    WhichField === "lastName" ? "border-2 border-[#e2a03f]" : ""
                  }  `}
                  placeholder={`${t("auth.enter")} ${t("auth.lastname")}`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label htmlFor="email">{t("auth.email")}</label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${
                    WhichField === "email" ? "border-2 border-[#e2a03f]" : ""
                  }  `}
                  placeholder={`${t("auth.enter")} ${t("auth.email")}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phone">{t("auth.phone")}</label>
                <input
                  id="phone"
                  type="phone"
                  className={`form-input ${
                    WhichField === "phone" ? "border-2 border-[#e2a03f]" : ""
                  }  `}
                  placeholder={`${t("auth.enter")} ${t("auth.phone")}`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label htmlFor="password">{t("auth.password")}</label>
                <input
                  id="password"
                  type="password"
                  className={`form-input ${
                    WhichField === "password" ? "border-2 border-[#e2a03f]" : ""
                  }  `}
                  placeholder={`${t("auth.enter")} ${t("auth.password")}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">
                  {t("auth.confirm")} {t("auth.password")}
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className={`form-input ${
                    WhichField === "confirmPassword"
                      ? "border-2 border-[#e2a03f]"
                      : ""
                  }  `}
                  placeholder={`${t("auth.confirm")} ${t("auth.password")}`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="cursor-pointer inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-[#888EA8]">
                  {t("auth.agree")}{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                  >
                    {t("auth.terms")}
                  </button>
                </span>
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              {!loadingSend ? (
                `${t("auth.signup").toUpperCase()}`
              ) : (
                <BeatLoader loading={loadingSend} color="#fff" size={10} />
              )}
            </button>
          </form>
          <div className="relative my-7 h-5 text-center before:absolute before:inset-0 before:m-auto before:h-[1px] before:w-full before:bg-[#ebedf2]">
            <div className="relative z-[1] inline-block bg-white px-2 font-bold text-[#888EA8]">
              <span>{t("auth.or")}</span>
            </div>
          </div>
          <ul className="mb-5 flex justify-center gap-2 sm:gap-5">
            <li>
              <button
                onClick={() => signUpWithGoogle()}
                type="button"
                className="btn flex gap-1 bg-[#888EA8]/30 text-black shadow-none hover:bg-white sm:gap-2 "
              >
                <svg
                  className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
                  viewBox="0 0 256 193"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                >
                  <g>
                    <path
                      d="M58.1818182,192.049515 L58.1818182,93.1404244 L27.5066233,65.0770089 L0,49.5040608 L0,174.59497 C0,184.253152 7.82545455,192.049515 17.4545455,192.049515 L58.1818182,192.049515 Z"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M197.818182,192.049515 L238.545455,192.049515 C248.203636,192.049515 256,184.224061 256,174.59497 L256,49.5040608 L224.844415,67.3422767 L197.818182,93.1404244 L197.818182,192.049515 Z"
                      fill="#34A853"
                    ></path>
                    <polygon
                      fill="#EA4335"
                      points="58.1818182 93.1404244 54.0077618 54.4932827 58.1818182 17.5040608 128 69.8676972 197.818182 17.5040608 202.487488 52.4960089 197.818182 93.1404244 128 145.504061"
                    ></polygon>
                    <path
                      d="M197.818182,17.5040608 L197.818182,93.1404244 L256,49.5040608 L256,26.2313335 C256,4.64587897 231.36,-7.65957557 214.109091,5.28587897 L197.818182,17.5040608 Z"
                      fill="#FBBC04"
                    ></path>
                    <path
                      d="M0,49.5040608 L26.7588051,69.5731646 L58.1818182,93.1404244 L58.1818182,17.5040608 L41.8909091,5.28587897 C24.6109091,-7.65957557 0,4.64587897 0,26.2313335 L0,49.5040608 Z"
                      fill="#C5221F"
                    ></path>
                  </g>
                </svg>
                Google
              </button>
            </li>
          </ul>
          <p className="text-center">
            {t("auth.have_account")}
            <Link
              href="/auth/signin"
              className="font-bold text-primary hover:underline ml-1"
            >
              {t("auth.signin")}
            </Link>
          </p>
        </div>
      </div>
    )
  );
};

export default page;
