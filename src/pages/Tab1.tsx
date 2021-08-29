import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButton, isPlatform, IonList, IonItem, IonText,
} from '@ionic/react';
import { useEffect, useState } from 'react';

import {
  futureDate, scheduleLocalNotifications, requestLocalNotificationPermission,
  checkLocalNotificationPermission,
} from '../utils/NotificationUtils';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [localNotificationsState, setLocalNotificationsState] = useState<string>();

  useEffect(() => {
    // No need to request notification permission on Android
    if (isPlatform('android')) {
      setLocalNotificationsState('granted');
      return;
    }

    checkLocalNotificationPermission().then((permissionState) => {
      setLocalNotificationsState(permissionState);
    });
  }, []);

  const promptForLocalNotificationPermission = () => {
    requestLocalNotificationPermission().then((permissionState) => {
      setLocalNotificationsState(permissionState);
    });
  };

  const scheduleDelayedNotifications = () => {
    scheduleLocalNotifications([
      {
        id: 10,
        title: 'First notification (3 second delay)',
        body: 'Expand notification for options.',
        actionTypeId: 'reminder',
        channelId: 'level5',
        schedule: {
          at: futureDate({ seconds: 3 }),
        },
      },
      {
        id: 11,
        title: 'Second notification (10 second delay)',
        body: 'It also worked! Also nice!',
        largeBody: "Wow there's so much text here. What an overwhelming amount of text. It's IRRESPONSIBLE to have this much text!",
        channelId: 'level5',
        schedule: {
          at: futureDate({ seconds: 10 }),
        },
      },
    ]);
  };

  const fireLevelNotification = (level: number) => {
    scheduleLocalNotifications([
      {
        id: level,
        title: `This is a level ${level} notification`,
        body: `Details for notification ${level}`,
        actionTypeId: 'reminder',
        channelId: `level${level}`,
      },
    ]);
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Notification Tests</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="notification-tests">
        <IonList>
          {
            localNotificationsState === 'denied'
            && (
              <IonItem>
                <IonText className="blocked-notification-message" color="danger">
                  Notifications are blocked, so the buttons below won&apos;t do anything.
                  <br />
                  Please update your app settings and enable notifications
                  if you want to see some sample notifications.
                </IonText>
              </IonItem>
            )
          }
          {
            localNotificationsState && localNotificationsState.startsWith('prompt')
            && (
              <IonItem>
                <IonButton color="medium" onClick={() => { promptForLocalNotificationPermission(); }}>Request local notification permission</IonButton>
              </IonItem>
            )
          }
          <IonItem>
            <IonButton color="primary" onClick={() => { scheduleDelayedNotifications(); }}>Schedule delayed notifications! (3 seconds, 10 seconds)</IonButton>
          </IonItem>
          <IonItem>
            <IonButton color="primary" onClick={() => { fireLevelNotification(5); }}>Fire level 5!</IonButton>
          </IonItem>
          <IonItem>
            <IonButton color="primary" onClick={() => { fireLevelNotification(4); }}>Fire level 4!</IonButton>
          </IonItem>
          <IonItem>
            <IonButton color="primary" onClick={() => { fireLevelNotification(3); }}>Fire level 3!</IonButton>
          </IonItem>
          <IonItem>
            <IonButton color="primary" onClick={() => { fireLevelNotification(2); }}>Fire level 2!</IonButton>
          </IonItem>
          <IonItem>
            <IonButton color="primary" onClick={() => { fireLevelNotification(1); }}>Fire level 1!</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
