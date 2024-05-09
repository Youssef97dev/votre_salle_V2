import { SortOrder } from "../../util/SortOrder";

export type ListingOrderByInput = {
  createdAt?: SortOrder;
  description?: SortOrder;
  guests?: SortOrder;
  id?: SortOrder;
  listingCreatedById?: SortOrder;
  locationData?: SortOrder;
  locationType?: SortOrder;
  mapData?: SortOrder;
  photos?: SortOrder;
  placeAmeneties?: SortOrder;
  placeType?: SortOrder;
  prestation?: SortOrder;
  price?: SortOrder;
  priceB2b?: SortOrder;
  slug?: SortOrder;
  tax?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
};
