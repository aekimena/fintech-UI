import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { colors } from "../../utils/colors";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const { height, width } = Dimensions.get("window");

const IndexIndicators = () => {
  return (
    <View style={styles.indicatorsCont}>
      <View style={[styles.indicators, { backgroundColor: "#fff" }]}></View>
      <View style={[styles.indicators, { backgroundColor: "#888" }]}></View>
      <View style={[styles.indicators, { backgroundColor: "#888" }]}></View>
    </View>
  );
};

export const Home = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["54%", "100%"], []);
  const [scrollIndex, setScrollIndex] = useState(0);

  const firstTranslateY = useSharedValue(-300);
  const secondTranslateY = useSharedValue(500);
  const cardTranslateY = useSharedValue(-300);

  useEffect(() => {
    if (firstTranslateY.value == -300) {
      firstTranslateY.value = withTiming(firstTranslateY.value + 300, {
        duration: 500,
      });
    }
    if (secondTranslateY.value == 500) {
      secondTranslateY.value = withTiming(secondTranslateY.value - 500, {
        duration: 500,
      });
    }
    if (cardTranslateY.value == -300) {
      cardTranslateY.value = withDelay(
        500,
        withTiming(cardTranslateY.value + 300, {
          duration: 1000,
        })
      );
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#333"} barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={{ transform: [{ translateY: firstTranslateY }] }}>
          <View style={[styles.header, styles.flexRowBtw]}>
            <View style={{ gap: 5 }}>
              <Text style={{ color: "#fff", fontSize: 16 }}>Hi, George</Text>
              <Text
                style={{ fontSize: 30, color: colors.white, fontWeight: "700" }}
              >
                Dashboard
              </Text>
            </View>
            <View>
              <Image
                source={require("../../../assets/images/placeholder-img.jpg")}
                style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
              />
            </View>
          </View>

          <View style={[styles.box1]}>
            <Text
              style={{ color: colors.white, fontSize: 22, fontWeight: "700" }}
            >
              {"Monitor your\nexpenses"}
            </Text>
            <TouchableOpacity style={styles.box1Btn}>
              <Text style={{ color: colors.white, fontSize: 15 }}>Get</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View
          style={{ transform: [{ translateY: secondTranslateY }] }}
        >
          <View style={styles.box2}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              <Animated.View
                style={[
                  styles.cardCont,
                  { transform: [{ translateY: cardTranslateY }] },
                ]}
              >
                <View style={styles.card}>
                  <View
                    style={[
                      styles.flexRowBtw,
                      {
                        marginTop: 10,
                        paddingHorizontal: 15,
                      },
                    ]}
                  >
                    <Text
                      style={{ color: "#fff", fontSize: 25, fontWeight: "500" }}
                    >
                      Visa
                    </Text>
                    <Text style={{ color: "#fff", fontSize: 30 }}>///</Text>
                  </View>
                  <View
                    style={[
                      styles.flexRowCenter,
                      {
                        marginTop: 5,
                        paddingHorizontal: 15,
                        justifyContent: "flex-start",
                        gap: 5,
                      },
                    ]}
                  >
                    <Text style={{ color: "#fff", fontSize: 25 }}>
                      **** **** ****
                    </Text>
                    <Text
                      style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}
                    >
                      6654
                    </Text>
                  </View>
                </View>
              </Animated.View>
              <Animated.View style={[styles.cardCont]}>
                <View style={[styles.card]}></View>
              </Animated.View>
            </ScrollView>
            <BottomSheet
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              backgroundStyle={{ backgroundColor: "rgba(102, 112, 114, 0.97)" }}
            >
              <BottomSheetView style={{ flex: 1 }}>
                <View
                  style={[
                    styles.flexRowBtw,
                    {
                      paddingHorizontal: 15,
                    },
                  ]}
                >
                  <Text style={{ color: "#fff", fontSize: 17 }}>Balance</Text>
                  <TouchableOpacity style={styles.seeMoreBtn}>
                    <Text style={{ color: "#fff", fontSize: 15 }}>
                      See more
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.flexRow,
                    {
                      marginTop: 10,
                      paddingHorizontal: 15,
                      gap: 5,
                    },
                  ]}
                >
                  <Text style={{ fontSize: 20, color: "yellow" }}>///</Text>
                  <Text
                    style={{ fontSize: 25, color: "#fff", fontWeight: "700" }}
                  >
                    6,145.52
                  </Text>
                </View>
                <View
                  style={[
                    styles.flexRowBtw,
                    {
                      marginTop: 15,
                      paddingHorizontal: 15,
                    },
                  ]}
                >
                  <Text style={{ color: "#fff" }}>23 March</Text>
                  <Text style={{ color: "#fff" }}>- $18.5</Text>
                </View>
                <View style={styles.lastPaymentCont}>
                  <View
                    style={[
                      styles.flexRow,
                      {
                        flex: 1,
                        gap: 10,
                      },
                    ]}
                  >
                    <Text style={{ color: "#000", fontSize: 25 }}>///</Text>
                    <View style={{ gap: 7 }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 17,
                          fontWeight: "500",
                        }}
                      >
                        ATM 375 Canal ST
                      </Text>

                      <Text style={{ color: "#fff" }}>Cash Withdrawal</Text>
                    </View>
                  </View>
                  <Text style={{ color: "#fff" }}>-$300</Text>
                </View>
              </BottomSheetView>
            </BottomSheet>
            <View style={styles.indicatorBg}>
              <IndexIndicators />
            </View>
          </View>
          <View style={styles.flexCont}>
            <View style={styles.box3}>
              <View style={styles.flexRowBtw}>
                <Text style={{ color: "#fff", fontSize: 18 }}>Profit</Text>
                <Text style={{ color: "green", fontSize: 30 }}>///</Text>
              </View>
              <Text style={{ fontSize: 22, fontWeight: "500", color: "#fff" }}>
                53.2%
              </Text>
              <Text style={{ color: "#fff" }}>Feb</Text>
              <Text style={{ color: "#000", fontSize: 16 }}>///</Text>
            </View>
            <View style={styles.box3}>
              <View style={styles.flexRowBtw}>
                <Text style={{ color: "#fff", fontSize: 18 }}>Debit</Text>
                <Text style={{ color: "#ff0000", fontSize: 30 }}>///</Text>
              </View>
              <Text style={{ fontSize: 22, fontWeight: "500", color: "#fff" }}>
                53.2%
              </Text>
              <Text style={{ color: "#fff" }}>Mar</Text>
              <Text style={{ color: "yellow", fontSize: 16 }}>///</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    paddingHorizontal: 20,
  },
  header: {
    overflow: "hidden",
    marginTop: 20,
  },
  box1: {
    height: 150,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(102, 112, 114, 0.95)",
    marginTop: 20,
    padding: 15,
    justifyContent: "space-between",
  },
  box1Btn: {
    backgroundColor: "#44B3CE",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
    alignSelf: "flex-start",
    alignItems: "center",
  },
  box3: {
    height: "100%",
    flex: 1,
    backgroundColor: "rgba(102, 112, 114, 0.95)",
    borderRadius: 20,
    padding: 15,
    justifyContent: "space-evenly",
  },
  flexCont: {
    height: 150,
    flexDirection: "row",
    gap: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  box2: {
    height: 250,
    backgroundColor: "rgba(102, 112, 114, 0.95)",
    width: "100%",
    borderRadius: 20,
    marginTop: 30,
    overflow: "hidden",
  },
  cardCont: {
    width: width - 40,
    alignSelf: "center",
    height: "100%",
    borderRadius: 20,
    padding: 15,
  },
  card: {
    backgroundColor: "teal",
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  indicators: {
    height: 5,
    width: 5,
    borderRadius: 5 / 2,
  },

  ///

  flexRowBtw: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  flexRowCenter: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  seeMoreBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#44B3CE",
    borderRadius: 10,
  },
  indicatorsCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  indicatorBg: {
    backgroundColor: "rgba(102, 112, 114, 1)",
    height: 30,
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  lastPaymentCont: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingHorizontal: 15,
    marginTop: 15,
  },
});
