import { useEffect, useState } from 'react';

const useAverageRating = (reviews) => {
    const [rating, setRating] = useState(0);
  
    useEffect(() => {
      const totalRatings = reviews?.reduce(
        (sum, review) => sum + parseFloat(review.ratings),
        0
      );
      const numberOfReviews = reviews?.length;
      const averageRating = totalRatings / numberOfReviews || 0;
      setRating(averageRating);
    }, [reviews]);
  
    return rating;
  };
  
  export default useAverageRating;