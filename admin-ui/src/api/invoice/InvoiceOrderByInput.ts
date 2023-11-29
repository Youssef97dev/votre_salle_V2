import { SortOrder } from "../../util/SortOrder";

export type InvoiceOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  status?: SortOrder;
  tripsId?: SortOrder;
  updatedAt?: SortOrder;
  userId?: SortOrder;
};
