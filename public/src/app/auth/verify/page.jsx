"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "airbnb/lib/auth";

const Verify = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verify = async () => {
      await verifyEmail(searchParams.get("token"));
      router.push("/");
    };
    if (searchParams.get("token")) {
      verify();
    }
  }, []);

  return <p>Verifying...</p>;
};

export default Verify;
