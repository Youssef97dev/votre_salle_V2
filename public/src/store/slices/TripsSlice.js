export const createTripsSlice = (set, get) => ({
    invoicedTrips: [],
    setInvoicedTrips: (invoicedTrips) => set({ invoicedTrips }),

    filteredInvoicedTrips: [],
    setFilteredInvoicedTrips: (filteredInvoicedTrips) => set({ filteredInvoicedTrips }),

    tripToReview : {},
    setTripToReview: (tripToReview) => set({ tripToReview }),

    loadingTrips: true,
    setLoadingTrips: (loadingTrips) => set({ loadingTrips }),

    showReviewModal: false,
    setShowReviewModal: () => {
        set({ showReviewModal: !get().showReviewModal });
    },

    relaunchTrips: false,
    setRelaunchTrips: () => {
        set({ relaunchTrips: !get().relaunchTrips });
    },
  });