import { JsonValue } from "type-fest";
import { Listing } from "../listing/Listing";
import { Trip } from "../trip/Trip";
import { Wishlist } from "../wishlist/Wishlist";

export type User = {
  companyInfo: JsonValue;
  createdAt: Date;
  firstName: string | null;
  id: string;
  lastName: string | null;
  listings?: Array<Listing>;
  phone: string | null;
  roles: JsonValue;
  trips?: Array<Trip>;
  updatedAt: Date;
  username: string;
  wishlists?: Array<Wishlist>;
};
