import { useState, useEffect } from "react";

import { addReview } from "airbnb/lib/lisitng";
import { userAppStore } from "airbnb/store/store";

import ReactStars from 'react-stars'

const Reviews = () => {
    const { currentListing } = userAppStore();
    useEffect(()=>{
        console.log("Review: ", currentListing);
    },[])
  return (
    <div className="pb-4 border-b border-gray-300">
        <h4 className="text-base md:text-xl font-semibold ">Reviews</h4>
    </div>
  )
}

export default Reviews