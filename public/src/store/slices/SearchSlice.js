export const createSearchSlice = (set, get) => ({
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
});
