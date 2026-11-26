import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type PasswordResetTokenUpdateInput = {
  expiresAt?: Date | null;
  token?: string;
  user?: UserWhereUniqueInput | null;
};
