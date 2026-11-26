import { InvoiceWhereUniqueInput } from "../invoice/InvoiceWhereUniqueInput";
import { ListingWhereUniqueInput } from "../listing/ListingWhereUniqueInput";
import { InputJsonValue } from "../../types";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TripCreateInput = {
  invoice?: InvoiceWhereUniqueInput | null;
  listing: ListingWhereUniqueInput;
  status?: string | null;
  tripinfo?: InputJsonValue;
  user: UserWhereUniqueInput;
};
