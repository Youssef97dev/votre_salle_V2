import { get } from "http";
import { createUrl, post } from "./http";
import qs from "qs";
import axios from "axios";
import { data } from "autoprefixer";

export const createLisitngAPI = async (listingData) => {
  const result = (
    await post(createUrl("/api/listings"), {
      ...listingData,
    }).catch(() => null)
  )?.data;

  console.log({ result });

  if (!result) {
    return alert("Could not create task");
  }

  return result;
};

export const updateLisitngAPI = async (listingId, prestation) => {
  const result = (
    await axios
      .patch(createUrl(`/api/listings/${listingId}`), {
        prestation,
      })
      .catch((error) => console.log(error))
  )?.data;

  console.log({ result });

  if (!result) {
    return alert("Could not create task");
  }

  return result;
};

export const getAllListings = async (locationType) => {
  const query =
    locationType !== "All"
      ? qs.stringify({
          where: { locationType },
          orderBy: { createdAt: "desc" },
        })
      : qs.stringify({
          orderBy: { createdAt: "desc" },
        });

  const result = await axios.get(createUrl(`/api/listings?${query}`));

  if (!result) {
    alert("Could not get listings");
    return [];
  }
  console.log(result.data);
  return result.data;
};

export const getListing = async (listingId) => {
  const result = await axios.get(createUrl(`/api/listings/${listingId}`));
  if (!result) {
  }
  return result.data;
};

export const getSearchListing = async (searchTerm) => {
  console.log(searchTerm)
  const query = qs.stringify({
    where: {
          OR: [
            searchTerm?.address?.address && {
              locationData:{
                path:["place"],
                string_contains: searchTerm?.address?.address
              },
            },
            searchTerm?.address?.address && {
              locationData:{
                path:["region"],
                string_contains: searchTerm?.address?.address
              }
            },
            searchTerm?.address?.address && {
              locationData:{
                path:["country"],
                string_contains: searchTerm?.address?.address
              }
            },
            searchTerm?.address?.address && {
              locationData:{
                path:["district"],
                string_contains: searchTerm?.address?.address
              }
            },
            searchTerm?.address?.address && {
              locationData:{
                path:["landmark"],
                string_contains: searchTerm?.address?.address
              }
            },
            searchTerm?.address?.address && {
              locationData:{
                path:["locality"],
                string_contains: searchTerm?.address?.address
              }
            },
            searchTerm?.address?.address && {
              locationData:{
                path:["postcode"],
                string_contains: searchTerm?.address?.address
              }
            },
            searchTerm?.address?.address && {
              locationData:{
                path:["neighborhood"],
                string_contains: searchTerm?.address?.address
              }
            },
          ],
          AND:[
            searchTerm?.guests && {
              placeSpace: {
                path: ["guests"],
                lte: searchTerm?.guests,
              },
            },
          ]
          
    },
  });
  const result = await axios.get(createUrl(`/api/listings?${query}`));

  if (!result) {
    console.log("not found");
  }

    const filteredListings = (searchTerm?.tripDate?.startDate !== '' && searchTerm?.tripDate?.endDate !== '') ? result.data.filter(listing=>
      !listing.trips.some(trip => {
        const tripStartDate = new Date(trip.tripinfo.startDate);
        const tripEndDate = new Date(trip.tripinfo.endDate);
        const searchStartDate = new Date(searchTerm.tripDate.startDate);
        const searchEndDate = new Date(searchTerm.tripDate.endDate);
        console.log("tripStartDate", tripStartDate)
        console.log("tripEndDate", tripEndDate)
        console.log("searchStartDate", searchStartDate)
        console.log("searchEndDate", searchEndDate)
    
        return (
          (tripStartDate <= searchStartDate && tripEndDate >= searchStartDate) ||
          (tripStartDate <= searchEndDate && tripEndDate >= searchEndDate) ||
          (tripStartDate >= searchStartDate && tripEndDate <= searchEndDate)
        );
      })
    ) : result.data;

    console.log("filtred:", filteredListings)

    return filteredListings;
  
  
};

export const getUserListings = async (userId) => {
  const query = qs.stringify({
    where: { listingCreatedById: userId },
  });
  const result = await axios.get(createUrl(`/api/listings?${query}`));
  if (!result) {
    console.log("not found");
  }
  console.log({ result });
  return result.data;
};

export const deleteListingAPI = async (id) => {
  const result = await axios.delete(createUrl(`/api/listings/${id}`));
  if (!result) {
    console.log("cannot delete");
  }
  return result;
};

export const addToWishList = async (id, userId) => {
  const query = {
    listing: { id },
    user: { id: userId },
  };

  const result = (
    await post(createUrl("/api/wishlists"), {
      ...query,
    }).catch(() => null)
  )?.data;

  console.log({ result });

  if (!result) {
    return alert("Could not create task");
  }

  return result;
};

export const getUserWishlists = async (userId) => {
  const query = qs.stringify({
    where: {
      user: { id: userId },
    },
    select: {
      listing: true,
    },
  });
  const result = (
    await axios.get(createUrl(`/api/wishlists?${query}`)).catch(() => null)
  )?.data;

  console.log({ result });
  return result;
};

export const removeFromWishListAPI = async (id) => {
  const result = await axios.delete(createUrl(`/api/wishlists/${id}`));
  if (!result) {
    console.log("cannot delete");
  }
  return result;
};

export const addTrip = async (data) => {
  const query = {
    listing: {
      id: data.listingId,
    },
    user: { id: data.userId },
    tripinfo: data.tripData,
    status: "Active",
  };
  const result = await axios.post(createUrl("/api/trips"), { ...query });
  if (!result) {
    alert("failed");
  } else {
    return result;
  }
};

export const EditStatusTrip = async (tripId, status) => {
  const query = {
    status,
  };
  const result = await axios.patch(createUrl(`/api/trips/${tripId}`), {
    ...query,
  });
  if (!result) {
    alert("failed");
  } else {
    return result;
  }
};

export const getUserTrips = async (userId) => {
  const query = qs.stringify({
    where: {
      user: { id: userId },
    },
    select: {
      listing: true,
    },
  });
  const result = (
    await axios.get(createUrl(`/api/trips?${query}`)).catch(() => null)
  )?.data;

  console.log({ result });
  return result;
};

export const getActiveTrips = async (listingId) => {
  const query = qs.stringify({
    where: {
      listing: {id:listingId},
      status: "Active",
    },
    select: {
      tripinfo: {
        startDate: true,
        endDate: true,
      },
    },
  });
  const result = (
    await axios.get(createUrl(`/api/trips?${query}`)).catch(() => null)
  )?.data;
  console.log("result trip active:", result)
  return result;
};

export const getUserReservedTrips = async (userId) => {
  const query = qs.stringify({
    where: {
      listing: { listingCreatedById: userId },
    },
  });
  const result = (
    await axios.get(createUrl(`/api/trips?${query}`)).catch(() => null)
  )?.data;

  console.log({ result });
  return result;
};

export const deleteTripAPI = async (id) => {
  const result = await axios.delete(createUrl(`/api/trips/${id}`));
  if (!result) {
    console.log("cannot delete");
  }
  return result;
};
