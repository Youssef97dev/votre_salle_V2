import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { TripWhereUniqueInput } from "../trip/TripWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type InvoiceWhereInput = {
  id?: StringFilter;
  status?: StringNullableFilter;
  trips?: TripWhereUniqueInput;
  user?: UserWhereUniqueInput;
};
