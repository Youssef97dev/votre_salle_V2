"use client";

// Libs
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Store
import { userAppStore } from "airbnb/store/store";

const page = () => {
  const router = useRouter();
  const { userInfo } = userAppStore();

  // protect admin page
  useEffect(() => {
    // Check if user is authenticated
    if (!userInfo) {
      router.push("/login");
    }
    // Check if user is admin
    if (userInfo.roles[0] !== "admin") {
      router.push("/");
    }
  }, [userInfo, router]);
  return <div>Reservations</div>;
};

export default page;
