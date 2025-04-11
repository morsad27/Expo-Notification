import { Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./styles/headerStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  // const { reminderList } = useContext(ReminderContext);
  const [reminders, setReminders] = useState([]);
  const [todoList, setTodoList] = useState([]);

  //load to-do list
  const loadTodoList = async () => {
    try {
      const storedList = await AsyncStorage.getItem("TodoList");
      if (storedList !== null) {
        setTodoList(JSON.parse(storedList));
      }
    } catch (err) {
      console.error("Error loading to-do list:", err);
    }
  };

  //load reminders
  const fetchReminders = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem("reminders");
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  // auto reload data
  useFocusEffect(
    React.useCallback(() => {
      loadTodoList();
      fetchReminders();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Ionicons name="notifications" size={35} color="white" />
        <Text style={styles.logoText}>Re:Mind</Text>
      </View>
      <View style={styles.circleRow}>
        <View style={styles.circle}>
          <Text style={styles.text}>{reminders.length}</Text>
          <Text style={styles.textTitle}>Reminds</Text>
        </View>

        <View style={styles.circle}>
          <Text style={styles.text}>{todoList.length}</Text>
          <Text style={styles.textTitle}>To-Do</Text>
        </View>
      </View>
      <Text style={styles.bottomText}>Lorem ipsum is a dummy text</Text>
    </View>
  );
};

export default Header;
