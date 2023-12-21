import { SortOrder } from "../../util/SortOrder";

export type UserOrderByInput = {
  adresse?: SortOrder;
  companyInfo?: SortOrder;
  createdAt?: SortOrder;
  firstName?: SortOrder;
  id?: SortOrder;
  lastName?: SortOrder;
  pack?: SortOrder;
  password?: SortOrder;
  phone?: SortOrder;
  profileImage?: SortOrder;
  profileLogo?: SortOrder;
  roleNotification?: SortOrder;
  roles?: SortOrder;
  typeUser?: SortOrder;
  typeUserNotification?: SortOrder;
  updatedAt?: SortOrder;
  username?: SortOrder;
};
