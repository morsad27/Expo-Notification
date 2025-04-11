import React from "react";
import Todo from "../app/(tabs)/todo";
import Reminders from "../app/(tabs)/reminder";

const QuickView = ({ selectedCapsule }) => {

  return (
    <>
      {selectedCapsule === "Reminders" && <Reminders showAddReminder={false} showdelete={false} />}
      {selectedCapsule === "To-Dos" && <Todo showAddButton={false} />}
    </>
  );
};

export default QuickView;
