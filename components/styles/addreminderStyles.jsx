import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    padding: 20,
    gap: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    minHeight: 55,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: 10,
  },
  multiInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: 10,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 55,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  inputField: {
    borderWidth: 1,
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#06f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  updateButton: {
    flex: 1,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  row:{
    display: 'flex',
    flexDirection: 'row',
    gap: 50
  },
  addButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "95%",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  
  reminderItem: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "#000",
  },
  reminderTitle: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontWeight: '500'
  },
  padbot:{
    paddingBottom: "30%",
  },
  editButton: {
    padding: 6,
    backgroundColor: "#2196F3",
    borderRadius: 6,
    marginLeft: 8,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  }
  
});