import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { InputJsonValue } from "../../types";
import { Decimal } from "decimal.js";
import { TripCreateNestedManyWithoutListingsInput } from "./TripCreateNestedManyWithoutListingsInput";
import { WishlistCreateNestedManyWithoutListingsInput } from "./WishlistCreateNestedManyWithoutListingsInput";

export type ListingCreateInput = {
  description: string;
  listingCreatedBy: UserWhereUniqueInput;
  locationData: InputJsonValue;
  locationType: string;
  mapData: InputJsonValue;
  photos: InputJsonValue;
  placeAmeneties: InputJsonValue;
  placeSpace: InputJsonValue;
  placeType: string;
  prestation?: InputJsonValue;
  price: number;
  priceB2b: number;
  tax: Decimal;
  title: string;
  trips?: TripCreateNestedManyWithoutListingsInput;
  wishlists?: WishlistCreateNestedManyWithoutListingsInput;
};
