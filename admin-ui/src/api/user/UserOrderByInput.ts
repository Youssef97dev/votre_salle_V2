import { SortOrder } from "../../util/SortOrder";

export type UserOrderByInput = {
  adresse?: SortOrder;
  companyInfo?: SortOrder;
  createdAt?: SortOrder;
  firstName?: SortOrder;
  id?: SortOrder;
  lastName?: SortOrder;
  password?: SortOrder;
  phone?: SortOrder;
  profileImage?: SortOrder;
  profileLogo?: SortOrder;
  roles?: SortOrder;
  typeUser?: SortOrder;
  updatedAt?: SortOrder;
  username?: SortOrder;
};
