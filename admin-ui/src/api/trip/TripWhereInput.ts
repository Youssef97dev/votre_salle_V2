import { StringFilter } from "../../util/StringFilter";
import { InvoiceWhereUniqueInput } from "../invoice/InvoiceWhereUniqueInput";
import { ListingWhereUniqueInput } from "../listing/ListingWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { JsonFilter } from "../../util/JsonFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TripWhereInput = {
  id?: StringFilter;
  invoice?: InvoiceWhereUniqueInput;
  listing?: ListingWhereUniqueInput;
  status?: StringNullableFilter;
  tripinfo?: JsonFilter;
  user?: UserWhereUniqueInput;
};
