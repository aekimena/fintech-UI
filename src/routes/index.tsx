import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./bottomTabs";
import { CardsView } from "../screens/CardsView";

const Routes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "transparentModal" }}
    >
      <Stack.Screen component={BottomTabs} name="BottomTabs" />
      <Stack.Screen component={CardsView} name="Cards" />
    </Stack.Navigator>
  );
};

export default Routes;

const styles = StyleSheet.create({});
