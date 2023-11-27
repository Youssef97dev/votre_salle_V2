"use client";
import React, { useEffect, useState } from "react";
import { userAppStore } from "airbnb/store/store";
import { getUserTripsByStatus } from "airbnb/lib/lisitng";

import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

import { CgProfile } from "react-icons/cg";
import { BsStars } from "react-icons/bs";

const DetailProfile = () => {
    const { userInfo } = userAppStore();

    useEffect(()=>{
        const invoicedTrip = async() => {
            const result = await getUserTripsByStatus(userInfo?.id, "Invoice");
            console.log(result)
        }
        invoicedTrip();
    }, [])

  return (
    <div>
        <Tab.Group>
    <Tab.List className="mt-3 flex flex-wrap gap-2 border-b border-gray-200 font-semibold text-sm">
    <Tab as={Fragment}>
            {({ selected }) => (
                <button
                    className={`${selected ? '!border-gray-200 !border-b-white text-[#3B3F5C] !outline-none' : ''} -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-[#3B3F5C]`}>
                    <CgProfile size={18} className="mr-2" />
                    Profile
                </button>
            )}
        </Tab>
        <Tab as={Fragment}>
            {({ selected }) => (
                <button
                    className={`${selected ? '!border-gray-200 !border-b-white text-[#3B3F5C] !outline-none' : ''} -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-[#3B3F5C]`}>
                    <BsStars size={18} className="mr-2" />
                    Reviews
                </button>
            )}
        </Tab>
    </Tab.List>

<Tab.Panels>
    <Tab.Panel>
        <div className="active pt-5">
            gggg
        </div>
    </Tab.Panel>
    <Tab.Panel>
        <div>
            gggggdeee
        </div>
    </Tab.Panel>
</Tab.Panels>
</Tab.Group>
    </div>
  )
}

export default DetailProfile