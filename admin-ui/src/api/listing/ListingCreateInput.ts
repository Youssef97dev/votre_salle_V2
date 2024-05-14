import { InputJsonValue } from "../../types";
import { Decimal } from "decimal.js";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { ReviewCreateNestedManyWithoutListingsInput } from "./ReviewCreateNestedManyWithoutListingsInput";
import { TripCreateNestedManyWithoutListingsInput } from "./TripCreateNestedManyWithoutListingsInput";
import { WishlistCreateNestedManyWithoutListingsInput } from "./WishlistCreateNestedManyWithoutListingsInput";

export type ListingCreateInput = {
  conditions: InputJsonValue;
  description: string;
  guests: Decimal;
  listingCreatedBy: UserWhereUniqueInput;
  locationData: InputJsonValue;
  locationType: string;
  mapData: InputJsonValue;
  photos: InputJsonValue;
  placeAmeneties: InputJsonValue;
  placeType: string;
  prestation?: InputJsonValue;
  price: number;
  priceB2b: number;
  reviews?: ReviewCreateNestedManyWithoutListingsInput;
  slug?: string | null;
  tax: Decimal;
  title: string;
  trips?: TripCreateNestedManyWithoutListingsInput;
  wishlists?: WishlistCreateNestedManyWithoutListingsInput;
};
