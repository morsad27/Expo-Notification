import { Stack } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Layout() {
  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission for notifications not granted');
      }
    };

    setupNotifications();
  }, []);

  return <Stack />;
}
