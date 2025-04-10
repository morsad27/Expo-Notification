import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Text,
  Alert,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";

export default function AddReminder() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    })();
  }, []);

  const handleAdd = async () => {
    if (!title) {
      alert("Please enter a reminder title.");
      return;
    }

    if (date.getTime() <= Date.now()) {
      alert("Please choose a future time.");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: title,
      },
      trigger: date, // ✅ Use exact time, not seconds
    });

    console.log("Scheduled reminder:", title, "at", date.toString());
    router.back();
  };

  const onChangeIOS = (event, selectedDate) => {
    if (selectedDate) setDate(selectedDate);
    setShowPicker(false);
  };

  const showAndroidDateTimePicker = () => {
    // First: date picker
    DateTimePickerAndroid.open({
      value: date,
      mode: "date",
      minimumDate: new Date(),
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          // Then: time picker
          DateTimePickerAndroid.open({
            value: selectedDate,
            mode: "time",
            is24Hour: true,
            onChange: (event, selectedTime) => {
              if (selectedTime) {
                const combined = new Date(selectedDate);
                combined.setHours(selectedTime.getHours());
                combined.setMinutes(selectedTime.getMinutes());
                setDate(combined);
              }
            },
          });
        }
      },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter reminder"
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Remind me at:</Text>
        <Button
          title={date.toLocaleString()}
          onPress={() =>
            Platform.OS === "android"
              ? showAndroidDateTimePicker()
              : setShowPicker(true)
          }
        />
      </View>

      {Platform.OS === "ios" && showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="inline"
          onChange={onChangeIOS}
          minimumDate={new Date()}
        />
      )}

      <Button title="Save Reminder" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});
