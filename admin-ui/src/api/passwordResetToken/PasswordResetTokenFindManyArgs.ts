import { PasswordResetTokenWhereInput } from "./PasswordResetTokenWhereInput";
import { PasswordResetTokenOrderByInput } from "./PasswordResetTokenOrderByInput";

export type PasswordResetTokenFindManyArgs = {
  where?: PasswordResetTokenWhereInput;
  orderBy?: Array<PasswordResetTokenOrderByInput>;
  skip?: number;
  take?: number;
};
