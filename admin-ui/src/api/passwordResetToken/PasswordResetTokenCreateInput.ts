import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type PasswordResetTokenCreateInput = {
  expiresAt?: Date | null;
  token: string;
  user?: UserWhereUniqueInput | null;
};
