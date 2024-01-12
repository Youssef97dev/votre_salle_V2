import { Dialog, Transition, Switch } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import ReactStars from "react-stars";
import { userAppStore } from "airbnb/store/store";

const AllReviews = ({ showAllReviews, setShowAllReviews, t }) => {
  const { currentListing } = userAppStore();

  return (
    <Transition appear show={showAllReviews} as={Fragment}>
      <Dialog
        as="div"
        open={showAllReviews}
        onClose={() => setShowAllReviews(false)}
      >
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
                <h5 className="font-bold text-lg">
                  {t("page.listing.reviews")}
                </h5>
                <button
                  onClick={() => setShowAllReviews(false)}
                  type="button"
                  className="text-white-dark hover:text-dark"
                >
                  X
                </button>
              </div>
              <div className="p-4 overflow-auto h-[35rem]">
                <div className="flex flex-col gap-8 w-full">
                  {currentListing.reviews.map((review, index) => (
                    <div
                      className="flex flex-col gap-1 items-start"
                      key={index}
                    >
                      <div className="flex gap-2 justify-center">
                        <span className="flex justify-center items-center bg-black text-white h-12 w-12 text-sm rounded-full">
                          {review?.user?.firstName
                            ?.split("")
                            .shift()
                            ?.toUpperCase()}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-extrabold text-sm">
                            {review?.user?.firstName} {review?.user?.lastName}
                          </span>
                          <ReactStars
                            count={5}
                            value={review.ratings}
                            size={18}
                            color2={"#ffd700"}
                          />
                        </div>
                      </div>

                      <div className="font-bold text-sm text-[#6e7582]">
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(review.createdAt))}
                      </div>
                      <div className="text-base font-medium text-[#494c52]">
                        {review?.comments}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AllReviews;
