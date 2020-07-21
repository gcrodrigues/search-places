import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const MockedNavigator = ({ component }: { component: any }) => {
  const AppStack = createStackNavigator();
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen name="MockedScreen" component={component} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default MockedNavigator;
