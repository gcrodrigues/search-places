import React from "react";
import { StatusBar } from "react-native";

import Routes from "./src/routes";

export default function App() {
  return (
    <>
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="rgba(0,0,0,.25)"
          translucent
        />
        <Routes />
      </>
    </>
  );
}
