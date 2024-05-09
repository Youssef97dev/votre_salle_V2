export const createSearchSlice = (set, get) => ({
  listingInfo: undefined,
  setListingInfo: (listing) => set({ listingInfo: listing }),
  searchLocation: undefined,
  setSearchLocation: (location) => set({ searchLocation: location }),
  selectionType: undefined,
  searchGuests: 0,
  dates: undefined,
  searchListings: [],
  setSearchListings: (searchListings) => set({ searchListings }),
  setSearchGuests: (searchGuests) => set({ searchGuests }),
  setSelectionType: (type) => set({ selectionType: type }),
  setDates: (dates) => set({ dates }),
  max: 0,
  min: 0,
  filter: {
    price: false,
    equipement: false,
    switch: false,
    coffe: false,
    lunch: false,
    dinner: false,
  },
  setMax: (max) => set({ max }),
  setMin: (min) => set({ min }),
  setFilter: (filter) => {
    set({ filter });
  },
  maxValueRange: 0,
  minValueRange: 0,
  setMaxValueRange: (maxValueRange) => set({ maxValueRange }),
  setMinValueRange: (minValueRange) => set({ minValueRange }),
  discardSearch: false,
  setDiscardSearch: () => {
    set({ discardSearch: !get().discardSearch });
  },
});
