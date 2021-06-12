import type { ScheduleOptions } from '@capacitor/local-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton,
} from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const futureDate = (hours: number, minutes: number, seconds: number): Date => {
    const offsetInMillis = ((hours * 3600) + (minutes * 60) + seconds) * 1000;
    const dateToReturn = new Date();
    dateToReturn.setTime(new Date().getTime() + offsetInMillis);
    return dateToReturn;
  };

  const fireLocalNotification = () => {
    console.log('This should fire a notification on a mobile device.');

    const scheduleOptions: ScheduleOptions = {
      notifications: [
        {
          id: 1,
          title: 'First notification',
          body: 'Expand notification for options.',
          actionTypeId: 'reminder',
        },
        {
          id: 2,
          title: 'Second notification',
          body: 'It also worked! Also nice!',
          largeBody: "Wow there's so much text here. What an overwhelming amount of text. It's IRRESPONSIBLE to have this much text!",
          schedule: {
            at: futureDate(0, 0, 5),
          },
        },
      ],
    };

    LocalNotifications.schedule(scheduleOptions);
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Notification Test</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonButton color="primary" onClick={() => { fireLocalNotification(); }}>Fire notification!</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
