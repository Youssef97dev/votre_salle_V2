import { Listing } from "../listing/Listing";
import { Decimal } from "decimal.js";
import { User } from "../user/User";

export type Review = {
  comments: string | null;
  createdAt: Date;
  id: string;
  listing?: Listing | null;
  ratings: Decimal | null;
  updatedAt: Date;
  user?: User | null;
};
