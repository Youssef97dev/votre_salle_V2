"use client";
import { Dialog, Transition } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";

import { addReview } from "airbnb/lib/lisitng";
import { userAppStore } from "airbnb/store/store";

import ReactStars from 'react-stars'

const ReviewModal = () => {
    const { userInfo,
        tripToReview,
        setTripToReview,
        showReviewModal,
        setShowReviewModal, setRelaunchTrips } = userAppStore();

    const [comment, setComment] = useState('')
    const [rate, setRate] = useState(0)

    const ratingChanged = (newRating) => {
        setRate(newRating);
    }
      
    const handleAddReview = async() => {
        const data = {
            listingId: tripToReview.listing.id,
            userId: userInfo?.id,
            comment,
            rate,
        }
        
        try{
            const result = await addReview(data);
            console.log(result);
        }catch(error) {
            console.log(error);
        }
        setTripToReview({});
        setRelaunchTrips();
        setShowReviewModal(false);
    }

  return (
    <Transition appear show={showReviewModal} as={Fragment}>
      <Dialog as="div" open={showReviewModal} onClose={() => {
        setTripToReview({});
        setShowReviewModal(false);
      }}>
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
            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black animate__animated animate__fadeInUp">
              <div className="flex bg-[#fbfbfb] items-center justify-between px-5 py-3 border-b border-gray-300">
                <h5 className="font-bold text-lg">Reviews</h5>
                <button
                  onClick={() => {
                    setTripToReview({});
                    setShowReviewModal(false);
                  }}
                  type="button"
                  className="text-white-dark hover:text-dark"
                >
                  X
                </button>
              </div>
              <div className="p-4">
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col">
                        <span className="font-semibold">Ratings</span>
                    <ReactStars count={5} value={rate} onChange={ratingChanged} size={24} color2={'#ffd700'} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">Comment</span>
                        <textarea
                            className="border border-gray-400 h-32 w-full rounded-lg active:border-gray-950 p-1 lg:p-3 no-scrollbar"
                            value={comment}
                            onChange={(e) => {
                            if (e.target.value.length <= 500) {
                                setComment(e.target.value);
                            }
                            }}
                        />
                        <span className="text-xs md:text-base">{comment.length}/500</span>
                    </div>
                </div>
                <div className="flex justify-end items-center mt-8 pt-2 border-t border-gray-300">
                  <button
                    onClick={() => {
                        setTripToReview({});
                        setShowReviewModal(false);
                    }}
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleAddReview()}
                    type="button"
                    className="btn btn-primary ml-4"
                  >
                    Add Review
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

export default ReviewModal