import { PasswordResetToken as TPasswordResetToken } from "../api/passwordResetToken/PasswordResetToken";

export const PASSWORDRESETTOKEN_TITLE_FIELD = "token";

export const PasswordResetTokenTitle = (
  record: TPasswordResetToken
): string => {
  return record.token?.toString() || String(record.id);
};
