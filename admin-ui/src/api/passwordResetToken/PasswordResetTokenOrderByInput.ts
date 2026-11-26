import { SortOrder } from "../../util/SortOrder";

export type PasswordResetTokenOrderByInput = {
  createdAt?: SortOrder;
  expiresAt?: SortOrder;
  id?: SortOrder;
  token?: SortOrder;
  updatedAt?: SortOrder;
  userId?: SortOrder;
};
