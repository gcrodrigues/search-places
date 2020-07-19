import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  noPermissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  noPermissionText: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
  },
  noPermissionButton: {
    alignItems: "stretch",
    backgroundColor: "#3c6",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 10,
  },
  noPermissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    alignItems: "center",
  },
  inputContainer: {
    width: "95%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderStyle: "solid",
    marginTop: Constants.statusBarHeight + 22,
    position: "absolute",
    zIndex: 2,
  },
  input: {
    width: "85%",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    fontSize: 18,
    color: "#333",
  },
  button: {
    width: "15%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
  markerView: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25 / 2,
    backgroundColor: "red",
    borderColor: "#505050",
    borderStyle: "solid",
    borderWidth: 1,
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
    // textAlign: "center",
    fontSize: 14,
    // marginBottom: 10,
  },
});
