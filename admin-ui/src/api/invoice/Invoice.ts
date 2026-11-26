import { Trip } from "../trip/Trip";
import { User } from "../user/User";

export type Invoice = {
  createdAt: Date;
  id: number;
  status: string | null;
  trips?: Trip | null;
  updatedAt: Date;
  user?: User | null;
};
