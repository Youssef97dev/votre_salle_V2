import { JsonFilter } from "../../util/JsonFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { InvoiceListRelationFilter } from "../invoice/InvoiceListRelationFilter";
import { ListingListRelationFilter } from "../listing/ListingListRelationFilter";
import { ReviewListRelationFilter } from "../review/ReviewListRelationFilter";
import { TripListRelationFilter } from "../trip/TripListRelationFilter";
import { WishlistListRelationFilter } from "../wishlist/WishlistListRelationFilter";

export type UserWhereInput = {
  companyInfo?: JsonFilter;
  firstName?: StringNullableFilter;
  id?: StringFilter;
  invoices?: InvoiceListRelationFilter;
  lastName?: StringNullableFilter;
  listings?: ListingListRelationFilter;
  phone?: StringNullableFilter;
  profileImage?: StringNullableFilter;
  profileLogo?: StringNullableFilter;
  reviews?: ReviewListRelationFilter;
  trips?: TripListRelationFilter;
  typeUser?: StringFilter;
  username?: StringFilter;
  wishlists?: WishlistListRelationFilter;
};
