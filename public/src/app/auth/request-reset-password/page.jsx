"use client";
import React, { useState, useEffect } from "react";
import { sendRecoverPasswordCode } from "airbnb/lib/auth";
import "../../../styles/tailwind.css";
import { BeatLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const page = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");
      const data = await sendRecoverPasswordCode(email);
      if (data?.response?.data?.error) {
        setErrorMessage(data.response.data.message);
        setLoading(false);
      } else {
        setSuccessMessage(
          "The password reset token has been sent successfully - Check your email"
        );
        setEmail("");
        setLoading(false);
      }
    } else {
      setErrorMessage("Email is required to send the password reset token.");
    }
  };

  return (
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

        {successMessage !== "" && (
          <div className="flex items-center p-3.5 my-2 rounded text-[#00ab55] bg-[#ddf5f0]">
            <span className="pr-2">
              <strong className="mr-1">Success!</strong>
              <span>{successMessage}.</span>
            </span>
            <button
              onClick={() => setSuccessMessage("")}
              type="button"
              className="ml-auto hover:opacity-80"
            >
              X
            </button>
          </div>
        )}
        <h2 className="mb-3 text-2xl font-bold">{t("auth.change_password")}</h2>
        <p className="mb-7">{t("auth.label_email")}</p>
        <form className="space-y-5" onSubmit={(e) => handleRecoverPassword(e)}>
          <div>
            <label htmlFor="email">{t("auth.email")}</label>
            <input
              id="email"
              type="email"
              defaultValue={email}
              className="form-input"
              placeholder={`${t("auth.enter")} ${t("auth.email")}`}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {!loading ? (
              `${t("auth.send_code").toUpperCase()}`
            ) : (
              <BeatLoader color="#fff" size={10} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
