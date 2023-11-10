import { StringFilter } from "../../util/StringFilter";
import { ListingWhereUniqueInput } from "../listing/ListingWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { JsonFilter } from "../../util/JsonFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TripWhereInput = {
  id?: StringFilter;
  listing?: ListingWhereUniqueInput;
  status?: StringNullableFilter;
  tripinfo?: JsonFilter;
  user?: UserWhereUniqueInput;
};
