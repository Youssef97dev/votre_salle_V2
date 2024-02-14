"use client"

import { useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import axios from 'axios';

const Verify = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("token")) {
      axios.get(`/api/verify?token=${searchParams.get("token")}`)
        .then(response => console.log(response.data.message))
        .catch(error => console.error(error));
    }
    router.push('/');
  }, []);

  return <p>Verifying...</p>;
};

export default Verify;