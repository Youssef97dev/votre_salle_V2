import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type PasswordResetTokenWhereInput = {
  expiresAt?: DateTimeNullableFilter;
  id?: StringFilter;
  token?: StringFilter;
  user?: UserWhereUniqueInput;
};
