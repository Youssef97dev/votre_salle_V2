import { SortOrder } from "../../util/SortOrder";

export type TripOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  invoiceId?: SortOrder;
  listingId?: SortOrder;
  status?: SortOrder;
  tripinfo?: SortOrder;
  updatedAt?: SortOrder;
  userId?: SortOrder;
};
