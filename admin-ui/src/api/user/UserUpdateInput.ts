import { InputJsonValue } from "../../types";
import { InvoiceUpdateManyWithoutUsersInput } from "./InvoiceUpdateManyWithoutUsersInput";
import { ListingUpdateManyWithoutUsersInput } from "./ListingUpdateManyWithoutUsersInput";
import { ReviewUpdateManyWithoutUsersInput } from "./ReviewUpdateManyWithoutUsersInput";
import { TripUpdateManyWithoutUsersInput } from "./TripUpdateManyWithoutUsersInput";
import { WishlistUpdateManyWithoutUsersInput } from "./WishlistUpdateManyWithoutUsersInput";

export type UserUpdateInput = {
  companyInfo?: InputJsonValue;
  firstName?: string | null;
  invoices?: InvoiceUpdateManyWithoutUsersInput;
  lastName?: string | null;
  listings?: ListingUpdateManyWithoutUsersInput;
  password?: string;
  phone?: string | null;
  reviews?: ReviewUpdateManyWithoutUsersInput;
  roles?: InputJsonValue;
  trips?: TripUpdateManyWithoutUsersInput;
  typeUser?: string;
  username?: string;
  wishlists?: WishlistUpdateManyWithoutUsersInput;
};
