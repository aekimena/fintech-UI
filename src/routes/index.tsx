import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./bottomTabs";

const Routes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={BottomTabs} name="BottomTabs" />
    </Stack.Navigator>
  );
};

export default Routes;

const styles = StyleSheet.create({});
