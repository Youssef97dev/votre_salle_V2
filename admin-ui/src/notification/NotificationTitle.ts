import { Notification as TNotification } from "../api/notification/Notification";

export const NOTIFICATION_TITLE_FIELD = "title";

export const NotificationTitle = (record: TNotification): string => {
  return record.title?.toString() || String(record.id);
};
