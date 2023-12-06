"use client";
import Link from "next/link";
import { userAppStore } from "airbnb/store/store";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { checkUser, login, signup } from "airbnb/lib/auth";
import "../../../styles/tailwind.css";
import { BeatLoader } from "react-spinners";

const page = () => {
  const router = useRouter();
  const { setAuthModal, setIsLoggedIn, setUserInfo } = userAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email && password) {
      const data = await login(email, password);
      if (data?.response?.data?.error) {
        setErrorMessage(data.response.data.message);
        setLoading(false);
      } else {
        setUserInfo(data);
        setIsLoggedIn(true);
        router.push("/");
        setLoading(false);
      }
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
        <h2 className="mb-3 text-2xl font-bold">Sign In</h2>
        <p className="mb-7">Enter your email and password to login</p>
        <form className="space-y-5" onSubmit={(e) => handleLogin(e)}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {!loading ? "SIGN IN" : <BeatLoader color="#fff" size={10} />}
          </button>
        </form>
        <div className="relative my-7 h-5 text-center before:absolute before:inset-0 before:m-auto before:h-[1px] before:w-full before:bg-[#ebedf2]">
          <div className="relative z-[1] inline-block bg-white px-2 font-bold text-[#888EA8]">
            <span>OR</span>
          </div>
        </div>
        <ul className="mb-5 flex justify-center gap-2 sm:gap-5">
          <li>
            <button
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
          Dont&apos;t have an account ?
          <Link
            href="/auth/signup"
            className="font-bold text-[#4361ee] hover:underline ml-1"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
