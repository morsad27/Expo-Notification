import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Home() {
  const [reminders, setReminders] = useState([
    { id: '1', title: 'Buy groceries' },
    { id: '2', title: 'Walk the dog' },
  ]);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.reminder}>{item.title}</Text>}
      />
      <Button title="Add Reminder" onPress={() => router.push('/add')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  reminder: { fontSize: 18, marginBottom: 10 },
});
