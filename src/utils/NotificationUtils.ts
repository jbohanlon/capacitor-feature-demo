import { LocalNotifications } from '@capacitor/local-notifications';
import type { ScheduleOptions, LocalNotificationSchema } from '@capacitor/local-notifications';

export const registerCustomActionTypes = () => {
  // Configure notification action types once, right here
  LocalNotifications.registerActionTypes({
    types: [
      {
        id: 'reminder',
        actions: [
          {
            id: 'showDetails',
            title: 'Show details',
          },
          {
            id: 'markAsCompleted',
            title: 'Mark as completed',
          },
          {
            id: 'snooze',
            title: 'Snooze',
          },
        ],
      },
    ],
  });
};

export const registerCustomListeners = () => {
  LocalNotifications.addListener('localNotificationActionPerformed', (notificationAction) => {
    console.log(`Action performed: ${notificationAction.actionId} for action type: ${notificationAction.notification.actionTypeId}`);
  });
};

interface DelayTime {
  days?: number,
  hours?: number,
  minutes?: number,
  seconds?: number
}

export const futureDate = ({
  days = 0, hours = 0, minutes = 0, seconds = 0,
}: DelayTime): Date => {
  const offsetInMillis = ((days * 86400) + (hours * 3600) + (minutes * 60) + seconds) * 1000;
  const dateToReturn = new Date();
  dateToReturn.setTime(new Date().getTime() + offsetInMillis);
  return dateToReturn;
};

export const scheduleLocalNotifications = (notifications: LocalNotificationSchema[]) => {
  const scheduleOptions: ScheduleOptions = {
    notifications,
  };

  LocalNotifications.schedule(scheduleOptions);
};
