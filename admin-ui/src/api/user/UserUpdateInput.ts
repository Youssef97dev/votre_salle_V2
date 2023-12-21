import { InputJsonValue } from "../../types";
import { InvoiceUpdateManyWithoutUsersInput } from "./InvoiceUpdateManyWithoutUsersInput";
import { ListingUpdateManyWithoutUsersInput } from "./ListingUpdateManyWithoutUsersInput";
import { ReviewUpdateManyWithoutUsersInput } from "./ReviewUpdateManyWithoutUsersInput";
import { TripUpdateManyWithoutUsersInput } from "./TripUpdateManyWithoutUsersInput";
import { WishlistUpdateManyWithoutUsersInput } from "./WishlistUpdateManyWithoutUsersInput";

export type UserUpdateInput = {
  adresse?: string | null;
  companyInfo?: InputJsonValue;
  firstName?: string | null;
  invoices?: InvoiceUpdateManyWithoutUsersInput;
  lastName?: string | null;
  listings?: ListingUpdateManyWithoutUsersInput;
  pack?: number | null;
  password?: string;
  phone?: string | null;
  profileImage?: string | null;
  profileLogo?: string | null;
  reviews?: ReviewUpdateManyWithoutUsersInput;
  roleNotification?: string | null;
  roles?: InputJsonValue;
  trips?: TripUpdateManyWithoutUsersInput;
  typeUser?: string;
  typeUserNotification?: string | null;
  username?: string;
  wishlists?: WishlistUpdateManyWithoutUsersInput;
};
