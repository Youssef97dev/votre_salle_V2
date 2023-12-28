import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type NotificationCreateInput = {
  description?: string | null;
  photo?: string | null;
  read?: boolean | null;
  title?: string | null;
  user?: UserWhereUniqueInput | null;
};
