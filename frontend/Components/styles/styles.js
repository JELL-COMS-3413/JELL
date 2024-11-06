import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 27,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: 'monospace',
  },
  buttonContainer: {
    marginVertical: 10,
    alignSelf: "center",
    width: "50%",
  },
  itemList: {
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  itemContent: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "white",
  },
  itemActions: {
    flexDirection: "row",
  },
  actionText: {
    color: "blue",
    marginHorizontal: 5,
  },
  addButton: {
    width: 60,
    padding: 10,
    backgroundColor: "#0fff12",
    borderRadius: 50,
    alignSelf: "center",
    margin: 14,
  },
  addButtonText: {
    fontSize: 24,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
    height: 250,
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
  },
  addButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
    borderRadius: 20,
  },
  successButton: {
    backgroundColor: "#0fff12",
  },
  cancelButton: {
    backgroundColor: "#ff5c5c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  profileIcon: {
    height: 40,
    width: 40,
    alignSelf: 'center',    
  },
  background: {
    backgroundColor: "#E7C6CD",
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  pageContentContainer: {
    borderRadius: 20,
    backgroundColor: "#C1BC6B",
    width: "100%",
  },
  welcomeScreenBackground: {
    backgroundColor: "#C1BC6B",
    flex: 1,
    justifyContent: "center",
  },
  budgetButton: {
    alignItems: "center",
    backgroundColor: '#E7C6CD',
    padding: 5,
    width: '40%',
    alignSelf: 'center',
    marginBottom: 5,
    borderRadius: 20,
    
  },
});

