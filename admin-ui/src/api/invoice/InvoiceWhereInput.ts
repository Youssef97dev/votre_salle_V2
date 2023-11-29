import { BigIntFilter } from "../../util/BigIntFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { TripWhereUniqueInput } from "../trip/TripWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type InvoiceWhereInput = {
  id?: BigIntFilter;
  status?: StringNullableFilter;
  trips?: TripWhereUniqueInput;
  user?: UserWhereUniqueInput;
};
