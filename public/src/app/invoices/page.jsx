"use client";
import React, {useEffect} from 'react'
import { userAppStore } from "airbnb/store/store";
import {
  getInvoicesByUser
} from "airbnb/lib/lisitng";

const page = () => {
  const { userInfo } = userAppStore();
  useEffect(()=>{
    const getData = async () => {
      const data = await getInvoicesByUser(userInfo?.id);
      return data;
    }
    if(userInfo){
      getData()
    }
  },[])
  return (
    <div>invoices</div>
  )
}

export default page