import React, { useState, useEffect } from 'react'
import { userAppStore } from 'airbnb/store/store'
import { useRouter, usePathname } from "next/navigation";

// icons
import { AiOutlineSearch, AiOutlineUserAdd, AiOutlineHeart, AiOutlineHome } from 'react-icons/ai';
import { PiSignIn } from 'react-icons/pi';
import {IoAddCircleOutline} from 'react-icons/io5';
import {FaRegBuilding} from 'react-icons/fa';
import {RiReservedLine} from 'react-icons/ri';

// Components
import ScheduleMobile from '../common/ScheduleMobile';

const NavbarMobile = () => {
    const router = useRouter();
    const pathname = usePathname();
    const {
        setAuthModal,
        userInfo,
        setUserInfo,
        setMapView,
        setInitialView,
        showScheduleBar,
        setShowScheduleBar,
      } = userAppStore();
    
  return (
    <div className='fixed bottom-0 left-0 rounded-t-lg py-1 w-full bg-slate-100 z-50 shadow-lg border border-[#9095a086]'>
        {!userInfo ? (<ul className='flex justify-evenly gap-3'>
            <li className='px-2 py-1 flex flex-col gap-1 justify-center items-center'>
                <button onClick={setShowScheduleBar}><AiOutlineSearch size={20} color='#9095a0' /></button>
                <span className='text-[10px] text-[#9095a0] font-medium'>Explore</span>
            </li>
            <li className='px-2 py-1 flex flex-col gap-1 justify-center items-center'>
                <button onClick={setAuthModal}><AiOutlineUserAdd size={20} color='#9095a0' /></button>
                <span className='text-[10px] text-[#9095a0] font-medium'>Sign-Up</span>
            </li>
            <li className='px-2 py-1 flex flex-col gap-1 justify-center items-center'>
                <button onClick={setAuthModal}><PiSignIn size={20} color='#9095a0' /></button>
                <span className='text-[10px] text-[#9095a0] font-medium'>Sign-In</span>
            </li>
        </ul>) : (
            <ul className='flex justify-evenly items-center gap-2'>
                <li className={`px-1 py-1 flex flex-col gap-1 justify-center items-center`}>
                    <button onClick={() => router.push("/")}><AiOutlineHome size={20} color= {pathname !== '/' ? '#9095a0' : '#000033'} /></button>
                    <span className={`text-[10px] font-medium ${pathname !== '/' ? 'text-[#9095a0]' : '#000033'}`}>Home</span>
                </li>
                <li className='px-1 py-1 flex flex-col gap-1 justify-center items-center'>
                    <button onClick={() => router.push("/wishlist")}><AiOutlineHeart size={20} color= {pathname !== '/wishlist'? '#9095a0' : '#000033'} /></button>
                    <span className={`text-[10px] font-medium ${pathname !== '/wishlist' ? 'text-[#9095a0]' : '#000033'}`}>Wishlist</span>
                </li>
                {userInfo.roles[0] === "owner" && <li className='px-1 py-1 flex flex-col gap-1 justify-center items-center'>
                    <button onClick={()=>router.push("new-listing")}><IoAddCircleOutline size={20} color= {'#9095a0'} /></button>
                    <span className='text-[10px] text-[#9095a0] font-medium'>Add Hall</span>
                </li>}
                <li className='px-1 py-1 flex flex-col gap-1 justify-center items-center'>
                <button onClick={() => userInfo.roles[0] === "owner" ? router.push("/my-reservations") : router.push("/trips")}><RiReservedLine size={20} color= {pathname !== '/my-reservations' && pathname !== '/trips' ? '#9095a0' : '#000033'} /></button>
                    <span className={`text-[10px] font-medium ${pathname !== '/my-reservations' && pathname !== '/trips' ? 'text-[#9095a0]' : '#000033'}`}>Reserv...</span>
                </li>
                {userInfo.roles[0] === "owner" && <li className='px-1 py-1 flex flex-col gap-1 justify-center items-center'>
                <button onClick={()=>router.push("/my-listings")}><FaRegBuilding size={20} color= {pathname !== '/my-listings'? '#9095a0' : '#000033'} /></button>
                    <span className={`text-[10px] font-medium ${pathname !== '/my-listings' ? 'text-[#9095a0]' : '#000033'}`}>Listings</span>
                </li>}
            </ul>
        )}
        {/* Search popup */}
        {showScheduleBar && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
          <ScheduleMobile />
        </div>
      )}
    </div>
  )
}

export default NavbarMobile