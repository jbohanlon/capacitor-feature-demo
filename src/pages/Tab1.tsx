import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, isPlatform,
} from '@ionic/react';

import {
  futureDate, scheduleLocalNotifications, requestLocalNotificationPermissions, checkLocalNotificationPermissions,
} from '../utils/NotificationUtils';
import './Tab1.css';

const Tab1: React.FC = () => {
  const scheduleTestNotifications = () => {
    scheduleLocalNotifications([
      {
        id: 10,
        title: 'First notification',
        body: 'Expand notification for options.',
        actionTypeId: 'reminder',
        channelId: 'level5',
      },
      {
        id: 11,
        title: 'Second notification',
        body: 'It also worked! Also nice!',
        largeBody: "Wow there's so much text here. What an overwhelming amount of text. It's IRRESPONSIBLE to have this much text!",
        schedule: {
          at: futureDate({ seconds: 5 }),
        },
        channelId: 'level5',
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

  const consoleLogPermissionStatus = () => {
    checkLocalNotificationPermissions().then((permissionStatus) => { console.log(JSON.stringify(permissionStatus)); });
  };

  const renderPermissionButtonsOnIos = () => {
    if (isPlatform('ios')) {
      return (
        <>
          <IonButton color="primary" onClick={() => { requestLocalNotificationPermissions(); }}>Request local notification permissions!</IonButton>
          <IonButton color="primary" onClick={() => { consoleLogPermissionStatus(); }}>Console log permission status!</IonButton>
        </>
      );
    }

    return false;
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Notification Test</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        { renderPermissionButtonsOnIos() }
        <IonButton color="primary" onClick={() => { scheduleTestNotifications(); }}>Schedule test notifications!</IonButton>
        <IonButton color="primary" onClick={() => { fireLevelNotification(5); }}>Fire level 5!</IonButton>
        <IonButton color="primary" onClick={() => { fireLevelNotification(4); }}>Fire level 4!</IonButton>
        <IonButton color="primary" onClick={() => { fireLevelNotification(3); }}>Fire level 3!</IonButton>
        <IonButton color="primary" onClick={() => { fireLevelNotification(2); }}>Fire level 2!</IonButton>
        <IonButton color="primary" onClick={() => { fireLevelNotification(1); }}>Fire level 1!</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
