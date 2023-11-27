import { SortOrder } from "../../util/SortOrder";

export type ReviewOrderByInput = {
  comments?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  listingId?: SortOrder;
  ratings?: SortOrder;
  updatedAt?: SortOrder;
  userId?: SortOrder;
};
