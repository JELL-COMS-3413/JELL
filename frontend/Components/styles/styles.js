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
    flexDirection: "row",
    marginTop:10,    
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
    justifyContent: "space-between",
    maxHeight: "80%",
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  addButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    alignItems: "center",
    borderRadius: 20,
    flex: 1,
    maxWidth: 150,
  },
  successButton: {
    backgroundColor: "#B3C17A",
    borderColor:"#98A869",
    borderWidth: 2,
  },
  cancelButton: {
    backgroundColor: "#ff8c8c",
    borderColor: "#ff5c5c",
    borderWidth: 2,
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
    backgroundColor: "#98A869",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
  },
  pageContentContainer: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    marginBottom: 5,
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
    backgroundColor: "#98A869",
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
  progressBarContainer: {
    height: 30,
    width: 300,
    backgroundColor: "#e0e0df",
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: 5,
    alignSelf: "center", 
    marginTop: 20,
    borderWidth: 3,
    borderColor: "#98A869",
  },
  itemHeader: {
    fontSize: 10,
    fontFamily: "coolveticarg",
  },
});
