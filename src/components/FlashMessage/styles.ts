import { StyleSheet } from "react-native";

export default StyleSheet.create({
  flashContainer: {
    width: "100%",
    height: "6%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.7)",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
  flashMessage: {
    fontSize: 14,
    color: "#fff",
  },
});
