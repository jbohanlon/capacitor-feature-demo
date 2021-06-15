import { Channel, LocalNotifications } from '@capacitor/local-notifications';
import type { ScheduleOptions, LocalNotificationSchema, PermissionStatus } from '@capacitor/local-notifications';

export const registerCustomChannels = () => {
  // "Creating an existing notification channel with its original values performs no operation,
  // so it's safe to call this code when starting an app."
  // - https://developer.android.com/training/notify-user/channels#CreateChannel

  const channels: Channel[] = [
    {
      id: 'level5',
      name: 'Max - Level 5',
      description: 'Level 5 Notification Channel',
      importance: 5,
    },
    {
      id: 'level4',
      name: 'High - Level 4',
      description: 'Level 4 Notification Channel',
      importance: 4,
    },
    {
      id: 'level3',
      name: 'Default - Level 3',
      description: 'Level 3 Notification Channel',
      importance: 3,
    },
    {
      id: 'level2',
      name: 'Low - Level 2',
      description: 'Level 2 Notification Channel',
      importance: 2,
    },
    {
      id: 'level1',
      name: 'Min - Level 1',
      description: 'Level 1 Notification Channel',
      importance: 1,
    },
  ];

  channels.forEach((channel) => {
    LocalNotifications.createChannel(channel);
  });
};

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

export const requestLocalNotificationPermissions = (): Promise<PermissionStatus> => {
  return LocalNotifications.requestPermissions();
};

export const checkLocalNotificationPermissions = (): Promise<PermissionStatus> => {
  // Note: Allowed status response object is {"display":"granted"}
  return LocalNotifications.checkPermissions();
};
