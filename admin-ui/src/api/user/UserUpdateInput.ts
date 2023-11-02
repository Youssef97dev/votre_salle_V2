import { InputJsonValue } from "../../types";
import { ListingUpdateManyWithoutUsersInput } from "./ListingUpdateManyWithoutUsersInput";
import { TripUpdateManyWithoutUsersInput } from "./TripUpdateManyWithoutUsersInput";
import { WishlistUpdateManyWithoutUsersInput } from "./WishlistUpdateManyWithoutUsersInput";

export type UserUpdateInput = {
  companyInfo?: InputJsonValue;
  firstName?: string | null;
  lastName?: string | null;
  listings?: ListingUpdateManyWithoutUsersInput;
  password?: string;
  phone?: string | null;
  roles?: InputJsonValue;
  trips?: TripUpdateManyWithoutUsersInput;
  typeUser?: string;
  username?: string;
  wishlists?: WishlistUpdateManyWithoutUsersInput;
};
