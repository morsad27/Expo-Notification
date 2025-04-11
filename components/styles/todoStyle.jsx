import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    marginRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "#06f",
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "#000",
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#A9A9A9",
  },
});
