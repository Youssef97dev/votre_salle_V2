import { User } from "../user/User";

export type PasswordResetToken = {
  createdAt: Date;
  expiresAt: Date | null;
  id: string;
  token: string;
  updatedAt: Date;
  user?: User | null;
};
