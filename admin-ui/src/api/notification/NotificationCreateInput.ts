import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type NotificationCreateInput = {
  description?: string | null;
  read?: boolean | null;
  title?: string | null;
  user?: UserWhereUniqueInput | null;
};
