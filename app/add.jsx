import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';

export default function AddReminder() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleAdd = async () => {
    if (!title) return;

    // Schedule notification for 5 seconds from now (demo)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Reminder',
        body: title,
      },
      trigger: {
        seconds: 5, // For testing – change to { hour: 18, minute: 0, repeats: false } for time-based
      },
    });

    console.log('Reminder scheduled:', title);
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter reminder"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Save Reminder" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
