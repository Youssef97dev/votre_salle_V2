import { get } from "http";
import { createUrl, post } from "./http";
import * as qs from "qs";
import axios from "axios";

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

export const updateLisitngAPI = async (listingId, data) => {
  const result = (
    await axios
      .patch(createUrl(`/api/listings/${listingId}`), {
        ...data,
      })
      .catch((error) => console.log(error))
  )?.data;

  console.log({ result });

  if (!result) {
    return alert("Could not create task");
  }

  return result;
};

export const getAllListings = async (locationType, typeUser) => {
  const query =
    locationType !== "All"
      ? qs.stringify({
          where: { locationType },
          orderBy: { createdAt: "desc" },
        })
      : qs.stringify({
          orderBy: { createdAt: "desc" },
        });

  try {
    const result = await axios.get(createUrl(`/api/listings?${query}`));
    console.log(result);
    const maxPrice = Math.max(
      ...result.data.map((listing) =>
        typeUser === "B2C" ? listing.price : listing.priceB2b
      )
    );

    const minPrice = Math.min(
      ...result.data.map((listing) =>
        typeUser === "B2C" ? listing.price : listing.priceB2b
      )
    );

    return { data: result.data, maxPrice, minPrice };
  } catch (error) {
    console.log(error);
    alert("Could not get listings");
    return [];
  }
};

export const getListing = async (listingId) => {
  const result = await axios.get(createUrl(`/api/listings/${listingId}`));
  if (!result) {
  }
  return result.data;
};

export const getSearchListing = async (searchTerm) => {
  console.log(searchTerm);
  const query = qs.stringify({
    where: {
      OR: [
        searchTerm?.address?.address && {
          locationData: {
            path: ["place"],
            string_contains: searchTerm?.address?.address,
          },
        },
        searchTerm?.address?.address && {
          locationData: {
            path: ["region"],
            string_contains: searchTerm?.address?.address,
          },
        },
        searchTerm?.address?.address && {
          locationData: {
            path: ["country"],
            string_contains: searchTerm?.address?.address,
          },
        },
        searchTerm?.address?.address && {
          locationData: {
            path: ["district"],
            string_contains: searchTerm?.address?.address,
          },
        },
        searchTerm?.address?.address && {
          locationData: {
            path: ["landmark"],
            string_contains: searchTerm?.address?.address,
          },
        },
        searchTerm?.address?.address && {
          locationData: {
            path: ["locality"],
            string_contains: searchTerm?.address?.address,
          },
        },
        searchTerm?.address?.address && {
          locationData: {
            path: ["postcode"],
            string_contains: searchTerm?.address?.address,
          },
        },
        searchTerm?.address?.address && {
          locationData: {
            path: ["neighborhood"],
            string_contains: searchTerm?.address?.address,
          },
        },
      ],
      AND: [
        searchTerm?.guests && {
          placeSpace: {
            path: ["guests"],
            lte: searchTerm?.guests,
          },
        },
      ],
    },
  });
  const result = await axios.get(createUrl(`/api/listings?${query}`));

  if (!result) {
    console.log("not found");
  }

  const filteredListings =
    searchTerm?.tripDate?.startDate !== "" &&
    searchTerm?.tripDate?.endDate !== ""
      ? result.data.filter(
          (listing) =>
            !listing.trips.some((trip) => {
              const tripStartDate = new Date(trip?.tripinfo?.startDate);
              const tripEndDate = new Date(trip?.tripinfo?.endDate);
              const searchStartDate = new Date(searchTerm?.tripDate?.startDate);
              const searchEndDate = new Date(searchTerm?.tripDate?.endDate);
              console.log("tripStartDate", tripStartDate);
              console.log("tripEndDate", tripEndDate);
              console.log("searchStartDate", searchStartDate);
              console.log("searchEndDate", searchEndDate);

              return (
                (tripStartDate <= searchStartDate &&
                  tripEndDate >= searchStartDate) ||
                (tripStartDate <= searchEndDate &&
                  tripEndDate >= searchEndDate) ||
                (tripStartDate >= searchStartDate &&
                  tripEndDate <= searchEndDate)
              );
            })
        )
      : result.data;

  console.log("filtred:", filteredListings);

  return filteredListings;
};

export const getFiltredListing = async (
  typeUser,
  max,
  min,
  tax,
  coffe,
  lunch,
  dinner
) => {
  const result = await axios.get(createUrl(`/api/listings`));

  const filteredListings = result?.data.filter((listing) => {
    const isB2C = typeUser === "B2C";
    const priceCondition = isB2C ? listing.price : listing.priceB2b;

    const withinPriceRange =
      max && min ? priceCondition >= min && priceCondition <= max : true;
    const hasZeroTax = tax ? listing.tax === "0" : true;
    const hasPoseCoffe = coffe ? listing.prestation?.poseCafe.length > 0 : true;
    const hasPoseLunch = lunch
      ? listing.prestation?.poseDejeunner.length > 0
      : true;
    const hasPoseDinner = dinner
      ? listing.prestation?.poseDinner.length > 0
      : true;

    return (
      withinPriceRange &&
      hasZeroTax &&
      hasPoseCoffe &&
      hasPoseLunch &&
      hasPoseDinner
    );
  });

  if (!result) {
    console.log("not found");
  }

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
  try {
    const result = await axios.post(createUrl("/api/trips"), { ...query });
    return result;
  } catch (error) {
    return error;
  }
};

export const updateTrip = async (tripId, data) => {
  const query = {
    tripinfo: data.tripData,
    status: data.status,
  };
  try {
    const result = await axios.patch(createUrl(`/api/trips/${tripId}`), {
      ...query,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
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

export const getUserTripsByStatus = async (userId, status) => {
  const query = qs.stringify({
    where: {
      user: { id: userId },
      status,
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
      listing: { id: listingId },
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
  console.log("result trip active:", result);
  return result;
};

export const getUserReservedTrips = async (userId) => {
  const query = qs.stringify({
    where: {
      listing: { listingCreatedById: userId },
      tripinfo: {
        path: ["type"],
        string_contains: "reservation",
      },
    },
  });
  const result = (
    await axios.get(createUrl(`/api/trips?${query}`)).catch(() => null)
  )?.data;

  console.log({ result });
  return result;
};

export const deleteTripAPI = async (id) => {
  try {
    const result = await axios.delete(createUrl(`/api/trips/${id}`));
    return result;
  } catch (error) {
    return error;
  }
};

export const addReview = async (data) => {
  const query = {
    listing: {
      id: data.listingId,
    },
    user: { id: data.userId },
    ratings: parseFloat(data.rate),
    comments: data.comment,
  };
  const result = await axios.post(createUrl("/api/reviews"), { ...query });
  console.log(result);
  if (!result) {
    alert("failed");
  } else {
    return result;
  }
};

// Invoices
export const addInvoice = async (data) => {
  const query = {
    trips: {
      id: data.tripId,
    },
    user: { id: data.userId },
    status: "Pending",
  };
  const result = await axios.post(createUrl("/api/invoices"), { ...query });
  console.log(result);
  if (!result) {
    alert("failed");
  } else {
    return result;
  }
};

export const getInvoicesByUser = async (id) => {
  const query = qs.stringify({
    where: {
      user: { id },
    },
  });
  const result = (
    await axios.get(createUrl(`/api/invoices?${query}`)).catch(() => null)
  )?.data;

  console.log({ result });
  return result;
};

export const changeInvoiceStatus = async (invoiceId, status) => {
  const query = {
    status,
  };
  const result = await axios.patch(createUrl(`/api/invoices/${invoiceId}`), {
    ...query,
  });
  if (!result) {
    alert("failed");
  } else {
    return result;
  }
};

export const downloadInvoice = async (invoiceId) => {
  try {
    const response = await axios.get(
      createUrl(`/api/invoices/${invoiceId}/generate`),
      {
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "facture.pdf");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    alert("Error downloading PDF:", error);
  }
};

// Users
export const updateMyProfile = async (
  myId,
  inputData,
  companyInfo,
  profileImage
) => {
  try {
    const data = {
      username: inputData.email,
      firstName: inputData.firstName,
      lastName: inputData.lastName,
      phone: inputData.phone,
      adresse: inputData.adresse,
      companyInfo,
      profileImage,
    };
    const result = await axios.patch(createUrl(`/api/users/${myId}`), {
      ...data,
    });
    console.log("data: ", result?.data);
    return result?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const changeTypeUser = async (myId, typeUserNotification) => {
  const query = {
    typeUserNotification,
  };
  try {
    const result = await axios.patch(createUrl(`/api/users/${myId}`), {
      ...query,
    });
    console.log("data: ", result?.data);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Notification
export const addToNotification = async (
  title,
  description,
  photo,
  read,
  id
) => {
  const query = {
    title,
    description,
    photo,
    read,
    user: { id },
  };
  try {
    const result = (
      await post(createUrl("/api/notifications"), {
        ...query,
      }).catch(() => null)
    )?.data;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const readNotification = async (id, read) => {
  const query = {
    read,
  };
  try {
    const result = (
      await axios
        .patch(createUrl(`/api/notifications/${id}`), {
          ...query,
        })
        .catch(() => null)
    )?.data;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
