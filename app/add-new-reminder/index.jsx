import React, { useState, useEffect } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Image,
  Modal,
  FlatList,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalendarPicker from "react-native-calendar-picker";
import { TimePickerModal } from "react-native-paper-dates";
import * as Notifications from "expo-notifications";
import { styles } from "../../components/styles/addreminderStyles";
import { useFocusEffect } from "@react-navigation/native";
import { v4 as uuidv4 } from 'uuid';

const Index = ({
  showAddReminder = true,
  showlist = false,
  showdelete = true,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("Select Date");
  const [selectedTime, setSelectedTime] = useState("Select Time");
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0 });
  const [editingText, setEditingText] = useState("");

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

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    };
    requestPermissions();

    const fetchReminders = async () => {
      const storedReminders = await AsyncStorage.getItem("reminders");
      if (storedReminders) setReminders(JSON.parse(storedReminders));
    };

    fetchReminders();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(
      `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    );
    setIsCalendarVisible(false);
  };

  const scheduleExpoNotification = async (title, scheduledDate) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Remember: ${title}`,
        body:  description,
      },
      trigger: scheduledDate,
    });
  };

  const addReminder = async () => {
    if (
      !title ||
      selectedDate === "Select Date" ||
      selectedTime === "Select Time"
    ) {
      return Alert.alert("Incomplete Fields", "Please enter all details!");
    }

    const [month, day, year] = selectedDate.split("/");
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const reminderDate = new Date(year, month - 1, day, hours, minutes);

    if (reminderDate < new Date()) {
      return Alert.alert("Invalid Time", "Please select a future time.");
    }

    await scheduleExpoNotification(title, reminderDate);

    const newReminder = {
      id: uuidv4(),
      title,
      description,
      date: selectedDate,
      time: selectedTime,
    };
    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));

    setTitle("");
    setDescription("");
    setSelectedDate("Select Date");
    setSelectedTime("Select Time");
  };

  const deleteReminder = async (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
  };

  const onConfirmTime = ({ hours, minutes }) => {
    setTime({ hours, minutes });
    setSelectedTime(`${hours}:${minutes < 10 ? "0" + minutes : minutes}`);
    setTimeModalVisible(false);
  };

  const editReminder = async (id, newText) => {
    try {
      const updatedReminders = reminders.map((item, index) =>
        index === id ? { ...item, title: newText } : item
      );
      setReminders(updatedReminders);
      await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
    } catch (err) {
      alert("Error updating reminder: " + err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {showAddReminder && (
        <View style={styles.mainContainer}>
          {/* title input */}
          <Text style={styles.text}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          {/* description */}
          <Text style={styles.text}>Description</Text>
          <TextInput
            style={styles.multiInput}
            placeholder="Description"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* date picker */}
          <Text style={styles.text}>Date</Text>
          <Pressable
            style={styles.inputWithIcon}
            onPress={() => setIsCalendarVisible(true)}
          >
            <Image
              source={require("../../assets/images/calendaricon.png")}
              style={styles.icon}
            />
            <Text>{selectedDate}</Text>
          </Pressable>

          {/* time picker */}
          <Text style={styles.text}>Time</Text>
          <Pressable
            style={styles.inputWithIcon}
            onPress={() => setTimeModalVisible(true)}
          >
            <Image
              source={require("../../assets/images/timeicon.png")}
              style={styles.icon}
            />
            <Text>{selectedTime}</Text>
          </Pressable>

          <Pressable style={styles.addButton} onPress={addReminder}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
      )}

      {/* reminder list */}
      {showlist && (
        <View style={styles.padbot}>
          <FlatList
            data={reminders}
            renderItem={({ item, index }) => (
              <View style={styles.reminderItem}>
                {/* {item.id === editingId ? (
                <TextInput
                  style={styles.input}
                  value={editingText}
                  onChangeText={(text) => setEditingText(text)}
                  onBlur={() => {
                    editReminder(item.id, editingText);
                    setEditingId(null);
                  }}
                />
              ) : ( */}
                <View>
                  <Text
                    style={styles.reminderTitle}
                    onPress={() => {
                      setEditingId(item.id);
                      setEditingText(item.text);
                    }}
                  >
                    {item.title}
                  </Text>

                  <View>
                    <Text>
                      🕒{item.time} {"\n"}
                      🗓️ {item.date}
                    </Text>
                  </View>
                </View>
                {/* )} */}

                {showdelete && (
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => deleteReminder(index)}
                  >
                    <Image
                      source={require("../../assets/images/removeicon.png")}
                      style={styles.icon}
                    />
                  </Pressable>
                )}
              </View>
            )}
          />
        </View>
      )}

      {/* Calendar modal */}
      <Modal visible={isCalendarVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setIsCalendarVisible(false)}
          />
          <View style={styles.modalContent}>
            <CalendarPicker onDateChange={handleDateChange} />
            <Pressable
              style={styles.closeButton}
              onPress={() => setIsCalendarVisible(false)}
            >
              <Text style={{color: "#fff"}}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Time picker modal */}
      <TimePickerModal
        visible={timeModalVisible}
        onDismiss={() => setTimeModalVisible(false)}
        onConfirm={onConfirmTime}
        label="Select a time"
        hours={time.hours}
        minutes={time.minutes}
      />
    </SafeAreaView>
  );
};

export default Index;
