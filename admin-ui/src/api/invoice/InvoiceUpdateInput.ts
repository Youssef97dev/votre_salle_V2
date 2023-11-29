import { TripWhereUniqueInput } from "../trip/TripWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type InvoiceUpdateInput = {
  status?: string | null;
  trips?: TripWhereUniqueInput | null;
  user?: UserWhereUniqueInput | null;
};
