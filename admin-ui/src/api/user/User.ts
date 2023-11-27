import { JsonValue } from "type-fest";
import { Listing } from "../listing/Listing";
import { Review } from "../review/Review";
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
  reviews?: Array<Review>;
  roles: JsonValue;
  trips?: Array<Trip>;
  typeUser: string;
  updatedAt: Date;
  username: string;
  wishlists?: Array<Wishlist>;
};
