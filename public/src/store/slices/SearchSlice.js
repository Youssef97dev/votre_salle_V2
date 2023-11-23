export const createSearchSlice = (set, get) => ({
  listingInfo: undefined,
  setListingInfo: (listing) => set({ listingInfo: listing }),
  searchLocation: undefined,
  setSearchLocation: (location) => set({ searchLocation: location }),
  selectionType: undefined,
  searchPlaceSpace: {
    guests: 0,
  },
  dates: undefined,
  searchListings: [],
  setSearchListings: (searchListings) => set({ searchListings }),
  setSearchPlaceSpace: (searchPlaceSpace) => set({ searchPlaceSpace }),
  setSelectionType: (type) => set({ selectionType: type }),
  setDates: (dates) => set({ dates }),
  max: 0,
  min: 0,
  filter: { price: false, equipement: false },
  setMax: (max) => set({ max }),
  setMin: (min) => set({ min }),
  setFilter: (filter) => {
    set({ filter });
  },
  originalListings: undefined,
  setOriginalListings: (originalListings) => set({ originalListings }),
});
