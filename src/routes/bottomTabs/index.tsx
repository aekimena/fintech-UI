import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../../screens/bottomTabs/Home";

const BottomTabs = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Home} name="Home" />
    </Stack.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
