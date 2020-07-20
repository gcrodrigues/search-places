import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 20 + Constants.statusBarHeight,
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  placeName: {
    fontSize: 24,
  },
  rating: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  placeDetails: {
    flex: 1,
  },
  placeDetailsCell: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    flexDirection: "row",
  },
  placeAddress: {
    marginLeft: 20,
  },
  placePhone: {
    marginLeft: 20,
  },
  placeOpen: {
    marginLeft: 20,
    fontWeight: "bold",
  },
  placeWebsite: {
    marginLeft: 20,
  },
  noInfo: {
    marginLeft: 20,
    fontStyle: "italic",
    color: "#c9c9c9",
  },
});
