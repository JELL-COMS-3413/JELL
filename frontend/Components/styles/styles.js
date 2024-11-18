import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "coolveticarg",
    textTransform: "uppercase",
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
    width: "80%",
    alignSelf: "center",
    marginTop: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
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
    padding: 5,
    backgroundColor: "#ccc",
    borderRadius: 20,
    alignSelf: "flex-end",
    margin: 5,
    width: 80,
    marginRight: 10,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: "LouisGeorgeCafe",
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
    fontFamily: "LouisGeorgeCafe",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
  },
  profileIcon: {
    height: 50,
    width: 50,
    borderWidth: 2,
    borderRadius: 20,
    alignSelf: "flex-start",
    margin: 20,
  },
  addButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
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
    fontFamily: "LouisGeorgeCafe",
  },
  background: {
    backgroundColor: "#E7C6CD",
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  greenPageSection: {
    backgroundColor: "#C1BC6B",
    width: "100%",
    height: "60%",
    justifyContent: "center",
  },
  pageContentContainer: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    margin: 20,
  },
  welcomeButton: {
    alignItems: "center",
    backgroundColor: "#E7C6CD",
    padding: 5,
    width: "40%",
    alignSelf: "center",
    marginBottom: 5,
    borderRadius: 20,
  },
  welcomeBackground: {
    backgroundColor: "#DEDBAE",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontFamily: "LouisGeorgeCafe",
  },
  welcomefont: {
    fontFamily: "LouisGeorgeCafe",
    fontSize: 16,
  },
  profileHeader: {
    height: 200,
    width: 200,
    borderWidth: 2,
    borderRadius: 20,
    alignSelf: "center",
    margin: 20,
  },
  budgetItem: {
    fontSize: 16,
    fontFamily: "coolveticarg",
    textTransform: "uppercase",
    width: 200,
  },
  value: {
    fontSize: 16,
    fontFamily: "coolveticarg",
    textAlign: "left",
    width: 200,
  },
  budgetCategories: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const ipAddress = "10.200.129.109";
