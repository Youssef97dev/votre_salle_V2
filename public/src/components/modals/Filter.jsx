import { Dialog, Transition } from '@headlessui/react';
import { useState, useEffect, Fragment } from 'react';

import { userAppStore } from "airbnb/store/store";

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const Filter = ({showFilter, setShowFilter}) => {
    const {
        listings,
        setListings,
        userInfo,
    } = userAppStore();

    const [maxPrice, setMaxPrice] = useState(Math.max(...listings.map(item => item.price)));
    const [minPrice, setMinPrice] = useState(Math.min(...listings.map(item => item.price)));
    

    useEffect(()=>{
        console.log("maxPrice", maxPrice)
        console.log("minPrice", minPrice)
    },[])
  return (
    <Transition appear show={showFilter} as={Fragment}>
                <Dialog as="div" open={showFilter} onClose={() => setShowFilter(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="fadein_left_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black animate__animated animate__fadeInUp">
                                <div className="flex bg-[#fbfbfb] items-center justify-between px-5 py-3 border-b border-gray-300">
                                    <h5 className="font-bold text-lg">Filter</h5>
                                    <button onClick={() => setShowFilter(false)} type="button" className="text-white-dark hover:text-dark">
                                        X
                                    </button>
                                </div>
                                <div className="p-4">
                                    <div className='flex flex-col gap-5 w-full'>
                                        <div className='flex flex-col'>
                                            <span className='font-semibold text-lg'>Price range</span>
                                            <span className='text-sm'>Price per day, taxes included</span>
                                        </div>
                                        <RangeSlider min={minPrice} max={maxPrice} step={10} onInput={(e)=>console.log(e)} />
                                    </div>
                                    <div className="flex justify-end items-center mt-8 pt-2 border-t border-gray-300">
                                        <button onClick={() => setShowFilter(false)} type="button" className="btn btn-outline-danger">
                                            Discard
                                        </button>
                                        <button onClick={() => setShowFilter(false)} type="button" className="btn btn-primary ml-4">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
  )
}

export default Filter