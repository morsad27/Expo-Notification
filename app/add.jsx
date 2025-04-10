import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";

export default function AddReminder() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();

  const handleAdd = async () => {
    if (!title) {
      alert("Please enter a reminder title.");
      return;
    }

    const triggerTime = date.getTime() - Date.now();

    if (triggerTime <= 0) {
      alert("Please choose a future time.");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: title,
      },
      trigger: {
        date, // exact date and time
      },
    });

    console.log("Scheduled reminder:", title, "at", date.toString());
    router.back();
  };

  const onChange = (event, selectedDate) => {
    if (Platform.OS === "android") setShowPicker(false); // Android: manually hide picker

    if (selectedDate) setDate(selectedDate);
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
          onPress={() => setShowPicker(true)}
        />
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={onChange}
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
