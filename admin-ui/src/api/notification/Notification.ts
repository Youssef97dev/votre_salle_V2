import { User } from "../user/User";

export type Notification = {
  createdAt: Date;
  description: string | null;
  id: string;
  photo: string | null;
  read: boolean | null;
  title: string | null;
  updatedAt: Date;
  user?: User | null;
};
