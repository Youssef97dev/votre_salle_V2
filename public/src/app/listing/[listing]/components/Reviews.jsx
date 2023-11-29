import { useState, useEffect } from "react";
import { userAppStore } from "airbnb/store/store";
import AllReviews from "airbnb/components/modals/AllReviews";

import ReactStars from 'react-stars'

const Reviews = () => {
    const { currentListing } = userAppStore();
    const [showAllReviews, setShowAllReviews] = useState(false)
  return (
    <div className="pb-4 border-b">
        <h4 className="text-base md:text-xl font-semibold ">Reviews</h4>
        <div className="w-full flex gap-2 items-start justify-between">
          <div className="flex flex-col items-start gap-2 w-full p-2" style={{flexBasis:"50%"}}>
            {
              currentListing.reviews.slice(0,3).map((review, index) => (
                <div className="flex flex-col gap-1 items-start" key={index}>
                  <div className="flex gap-2 justify-center">
                  <span className="flex justify-center items-center bg-black text-white h-12 w-12 text-sm rounded-full">
                    {review?.user?.firstName?.split("").shift()?.toUpperCase()}
                  </span>
                  <div className="flex flex-col">
                  <span className="font-semibold text-sm">
                    {review?.user?.firstName}{" "}{review?.user?.lastName}
                  </span>
                  <ReactStars count={5} value={review?.ratings} size={18} color2={'#ffd700'} />
                  </div>
                  </div>

                  <div className="font-semibold text-sm">
                    {
                      new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                      }).format(new Date(review?.createdAt))
                    }
                  </div>

                  <div className="text-sm">
                    {review?.comments}
                  </div>
                </div>
              ))
            }
          </div>
          <div className="flex flex-col items-start gap-2 w-full p-2" style={{flexBasis:"50%"}}>
            {
              currentListing.reviews.slice(3,6).map((review, index) => (
                <div className="flex flex-col gap-1 items-start" key={index}>
                  <div className="flex gap-2 justify-center">
                  <span className="flex justify-center items-center bg-black text-white h-12 w-12 text-sm rounded-full">
                    {review?.user?.firstName?.split("").shift()?.toUpperCase()}
                  </span>
                  <div className="flex flex-col">
                  <span className="font-semibold text-sm">
                    {review?.user?.firstName}{" "}{review?.user?.lastName}
                  </span>
                  <ReactStars count={5} value={review.ratings} size={18} color2={'#ffd700'} />
                  </div>
                  </div>

                  <div className="font-semibold text-sm">
                    {
                      new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                      }).format(new Date(review.createdAt))
                    }
                  </div>
                  <div className="text-sm">
                    {review?.comments}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        {
          currentListing?.reviews?.length > 6 &&
          <button className="btn btn-outline-info" onClick={() => setShowAllReviews(true)}>Show {currentListing?.reviews?.length} Reviews</button>
        }
        {showAllReviews && <AllReviews showAllReviews={showAllReviews} setShowAllReviews={setShowAllReviews} />}
    </div>
  )
}

export default Reviews