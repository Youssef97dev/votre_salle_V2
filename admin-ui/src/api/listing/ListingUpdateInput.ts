import { InputJsonValue } from "../../types";
import { Decimal } from "decimal.js";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { ReviewUpdateManyWithoutListingsInput } from "./ReviewUpdateManyWithoutListingsInput";
import { TripUpdateManyWithoutListingsInput } from "./TripUpdateManyWithoutListingsInput";
import { WishlistUpdateManyWithoutListingsInput } from "./WishlistUpdateManyWithoutListingsInput";

export type ListingUpdateInput = {
  conditions?: InputJsonValue;
  description?: string;
  guests?: Decimal;
  listingCreatedBy?: UserWhereUniqueInput;
  locationData?: InputJsonValue;
  locationType?: string;
  mapData?: InputJsonValue;
  photos?: InputJsonValue;
  placeAmeneties?: InputJsonValue;
  placeType?: string;
  prestation?: InputJsonValue;
  price?: number;
  priceB2b?: number;
  reviews?: ReviewUpdateManyWithoutListingsInput;
  slug?: string | null;
  tax?: Decimal;
  title?: string;
  trips?: TripUpdateManyWithoutListingsInput;
  wishlists?: WishlistUpdateManyWithoutListingsInput;
};
