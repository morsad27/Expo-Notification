import React, { useState } from "react";
import Todo from "../app/(tabs)/todo";
import Reminders from "../app/(tabs)/reminder";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuickView = ({ selectedCapsule }) => {

  return (
    <>
      {selectedCapsule === "Reminders" && <Reminders showAddReminder={false} />}
      {selectedCapsule === "To-Dos" && <Todo showAddButton={false} />}
    </>
  );
};

export default QuickView;
