import {
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { colors } from "../../utils/colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export const Home = () => {
  const headerHeight = useSharedValue(0);

  useEffect(() => {
    if (headerHeight.value < 100) {
      headerHeight.value += 100;
    }
  }, []);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: withTiming(headerHeight.value, { duration: 1000 }),
    };
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.darkBg} barStyle="light-content" />
      <Animated.View style={[animatedStyles, styles.header]}>
        <View>
          <Text style={{ color: "#888", fontSize: 14 }}>Hi, George</Text>
          <Text style={{ fontSize: 25, color: colors.white }}>Dashboard</Text>
        </View>
        <View>
          <Image
            source={require("../../../assets/images/placeholder-img.jpg")}
            style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBg,
    paddingHorizontal: 15,
  },
  header: {
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
