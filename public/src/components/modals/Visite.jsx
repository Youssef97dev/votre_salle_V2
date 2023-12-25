"use client";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";

import { RiSeparator } from "react-icons/ri";

const Visite = ({ showVisite, setShowVisite }) => {

  return (
    <Transition appear show={showVisite} as={Fragment}>
      <Dialog as="div" open={showVisite} onClose={() => setShowVisite(false)}>
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
        <div
          id="fadein_left_modal"
          className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-4xl my-8 text-black animate__animated animate__fadeIn">
              <div className="flex bg-[#fbfbfb] items-center justify-between px-5 py-3 border-b border-gray-300">
                <h5 className="font-bold text-lg">360 virtual tour</h5>
                <button
                  onClick={() => setShowVisite(false)}
                  type="button"
                  className="text-white-dark hover:text-dark"
                >
                  X
                </button>
              </div>
              <iframe id="virtual_tour_load" style={{width:"100%", height:"500px"}} data-src="https://360sitevisit.com/naninas/?mute=true" allowfullscreen="" src="https://360sitevisit.com/naninas/?mute=true"></iframe>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Visite;
