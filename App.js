import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import AnimeList from "./components/AnimeList";
import AnimeInfo from "./components/AnimeInfo";
import AnimeChat from "./components/AnimeChat";

const Stack = createStackNavigator();

const header = {
  headerStyle: {
    backgroundColor: "#A16E83",
  },
  headerTintColor: "white",
  headerTitleStyle: {
    fontWeight: "bold",
    fontStyle: "italic"
  },
};

//Navigation/Header for application
export default function Main() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#A16E83" style="light" />
      <Stack.Navigator
        initialRouteName="AnimeList"
        screenOptions={header}>
        <Stack.Screen name="AnimeAppi" component={AnimeList} />
        <Stack.Screen name="Info" component={AnimeInfo} />
        <Stack.Screen name="Chatti" component={AnimeChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}