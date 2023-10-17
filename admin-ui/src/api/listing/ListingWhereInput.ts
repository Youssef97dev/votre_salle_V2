import { StringFilter } from "../../util/StringFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { JsonFilter } from "../../util/JsonFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { FloatFilter } from "../../util/FloatFilter";
import { TripListRelationFilter } from "../trip/TripListRelationFilter";
import { WishlistListRelationFilter } from "../wishlist/WishlistListRelationFilter";

export type ListingWhereInput = {
  description?: StringFilter;
  id?: StringFilter;
  listingCreatedBy?: UserWhereUniqueInput;
  locationData?: JsonFilter;
  locationType?: StringNullableFilter;
  mapData?: JsonFilter;
  photos?: JsonFilter;
  placeAmeneties?: JsonFilter;
  placeSpace?: JsonFilter;
  placeType?: StringNullableFilter;
  price?: FloatFilter;
  title?: StringFilter;
  trips?: TripListRelationFilter;
  wishlists?: WishlistListRelationFilter;
};
