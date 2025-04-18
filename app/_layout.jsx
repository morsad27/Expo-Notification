import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Layout() {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission not granted for notifications");
      }
    };

    requestPermissions();
  }, []);

  return (
    <>
      {/* 👇 Set status bar color and style */}
      <StatusBar style="light" backgroundColor="#06f" />

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-new-reminder/index"
          options={{
            headerShown: true,
            title: "Add New Reminder",
            headerStyle: {
              backgroundColor: "#06f",
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
            },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold", alignSelf: "center" },
          }}
        />
      </Stack>
    </>
  );
}
