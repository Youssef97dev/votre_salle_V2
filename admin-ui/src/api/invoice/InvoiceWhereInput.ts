import { IntFilter } from "../../util/IntFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { TripWhereUniqueInput } from "../trip/TripWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type InvoiceWhereInput = {
  id?: IntFilter;
  status?: StringNullableFilter;
  trips?: TripWhereUniqueInput;
  user?: UserWhereUniqueInput;
};
