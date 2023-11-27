import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { ListingWhereUniqueInput } from "../listing/ListingWhereUniqueInput";
import { DecimalNullableFilter } from "../../util/DecimalNullableFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ReviewWhereInput = {
  comments?: StringNullableFilter;
  id?: StringFilter;
  listing?: ListingWhereUniqueInput;
  ratings?: DecimalNullableFilter;
  user?: UserWhereUniqueInput;
};
