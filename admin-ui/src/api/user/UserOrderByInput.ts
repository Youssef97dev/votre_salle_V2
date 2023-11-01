import { SortOrder } from "../../util/SortOrder";

export type UserOrderByInput = {
  companyInfo?: SortOrder;
  createdAt?: SortOrder;
  firstName?: SortOrder;
  id?: SortOrder;
  lastName?: SortOrder;
  password?: SortOrder;
  phone?: SortOrder;
  roles?: SortOrder;
  typeUser?: SortOrder;
  updatedAt?: SortOrder;
  username?: SortOrder;
};
