import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
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
    textAlign: "center",
    fontFamily: "Retrograde",
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
    fontFamily: "monospace",
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
    fontFamily: "monospace",
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
    fontFamily: "monospace",
  },
  profileIcon: {
    height: 40,
    width: 40,
    alignSelf: "center",
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
    padding: 20,
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
    backgroundColor: "#C1BC6B",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontFamily: "monospace",
  },
  welcomefont: {
    fontFamily: "Retrograde",
    fontSize: 16,
  },
  
});
