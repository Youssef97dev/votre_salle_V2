"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { changePassword } from "airbnb/lib/auth";
import "../../../styles/tailwind.css";
import { BeatLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setEmail(searchParams.get("email"));
    setToken(searchParams.get("token"));
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (password && confirmPassword && email && token) {
      setLoading(true);
      if (password !== confirmPassword) {
        setErrorMessage("Passwords don't match");
        setLoading(false);
        return;
      }
      const data = await changePassword(password, token, email);
      if (data?.response?.data?.error) {
        setErrorMessage(data.response.data.message);
        setLoading(false);
      } else {
        router.push("/auth/signin");
        setLoading(false);
      }
    }
  };

  return (
    isClient && (
      <div className="flex min-h-screen items-center justify-center bg-[url('/map.svg')] bg-cover bg-center">
        <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
          {errorMessage !== "" && (
            <div className="flex items-center p-3.5 my-2 rounded text-[#e2a03f] bg-[#fff9ed]">
              <span className="pr-2">
                <strong className="mr-1">{t("auth.warning")}!</strong>
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
          <h2 className="mb-3 text-2xl font-bold">
            {t("auth.change_password")}
          </h2>
          <p className="mb-7">{t("auth.label_change")}</p>
          <form className="space-y-5" onSubmit={(e) => handleChangePassword(e)}>
            <div>
              <label htmlFor="password">{t("auth.password")}</label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder={`${t("auth.enter")} ${t("auth.password")}`}
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
                className="form-input"
                placeholder={`${t("auth.confirm")} ${t("auth.password")}`}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              {!loading ? (
                `${t("auth.reset").toUpperCase()}`
              ) : (
                <BeatLoader color="#fff" size={10} />
              )}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default page;
