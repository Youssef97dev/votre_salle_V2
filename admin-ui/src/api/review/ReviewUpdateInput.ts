import { ListingWhereUniqueInput } from "../listing/ListingWhereUniqueInput";
import { Decimal } from "decimal.js";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ReviewUpdateInput = {
  comments?: string | null;
  listing?: ListingWhereUniqueInput | null;
  ratings?: Decimal | null;
  user?: UserWhereUniqueInput | null;
};
