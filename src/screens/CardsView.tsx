import {
  BackHandler,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import IonIcons from "@expo/vector-icons/Ionicons";
import { IndexIndicators } from "./bottomTabs/Home";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const boxBg = "rgba(102, 112, 114, 0.95)";
const { width, height } = Dimensions.get("window");

const PaymentHistory = ({ date, amount, paymentType }) => {
  return (
    <View style={{ gap: 5 }}>
      <View style={[styles.flexRowBtw]}>
        <Text style={{ color: "#fff", fontSize: 10 }}>{date}</Text>
        <Text style={{ color: "#fff", fontSize: 10 }}>
          + {paymentType == "btc" ? "BTC" : "$"}
          {amount}
        </Text>
      </View>
      <View style={[styles.flexRow, { alignItems: "flex-start" }]}>
        <View style={[styles.flexRow, { flex: 1, gap: 10 }]}>
          <Text style={{ color: "#000", fontSize: 30 }}>///</Text>
          <View>
            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "500" }}>
              Andries Grootoonk
            </Text>
            <Text style={{ color: "#fff", fontSize: 12 }}>Payment</Text>
          </View>
        </View>
        <Text style={{ color: "#fff", fontSize: 15, fontWeight: "500" }}>
          + {amount}
        </Text>
      </View>
    </View>
  );
};
export const CardsView = () => {
  const navigation = useNavigation<any>();
  const leftCircleX = useSharedValue(-300);
  const rightCircleX = useSharedValue(300);
  const cardY = useSharedValue(150);
  const cardOpacity = useSharedValue(1);
  const leftBoxX = useSharedValue(-300);
  const rightBoxX = useSharedValue(300);
  const bigBoxY = useSharedValue(500);

  useEffect(() => {
    if (leftCircleX.value == -300) {
      leftCircleX.value = withTiming(leftCircleX.value + 300, {
        duration: 500,
      });
    }
    if (rightCircleX.value == 300) {
      rightCircleX.value = withTiming(rightCircleX.value - 300, {
        duration: 500,
      });
    }
    if (cardY.value == 150) {
      cardY.value = withTiming(cardY.value - 150, { duration: 500 });
    }
    ///

    if (leftBoxX.value == -300) {
      leftBoxX.value = withDelay(
        500,
        withTiming(leftBoxX.value + 300, { duration: 500 })
      );
    }

    if (rightBoxX.value == 300) {
      rightBoxX.value = withDelay(
        500,
        withTiming(rightBoxX.value - 300, { duration: 500 })
      );
    }
    if (bigBoxY.value == 500) {
      bigBoxY.value = withDelay(
        500,
        withTiming(bigBoxY.value - 500, { duration: 500 })
      );
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onGoBack
    );

    return () => backHandler.remove();
  }, []);

  function onGoBack() {
    leftBoxX.value = withTiming(leftBoxX.value - 300, { duration: 500 });
    rightBoxX.value = withTiming(rightBoxX.value + 300, { duration: 500 });
    bigBoxY.value = withTiming(bigBoxY.value + 500, { duration: 500 });

    leftCircleX.value = withDelay(
      300,
      withTiming(leftCircleX.value - 300, {
        duration: 500,
      })
    );
    rightCircleX.value = withDelay(
      300,
      withTiming(rightCircleX.value + 300, {
        duration: 500,
      })
    );

    cardY.value = withDelay(
      300,
      withTiming(cardY.value + 100, { duration: 500 })
    );
    cardOpacity.value = withDelay(
      300,
      withTiming(cardOpacity.value - 1, { duration: 500 })
    );
    setTimeout(() => {
      navigation.goBack();
    }, 800);
    return true;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#333" }}>
      <View
        style={[
          styles.flexRow,
          { gap: 5, paddingHorizontal: 15, marginTop: 30 },
        ]}
      >
        <Pressable
          onPress={onGoBack}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? "rgba(255, 255, 255, 0.2)"
                : "transparent",
            },
            styles.backBtn,
          ]}
        >
          <IonIcons name="close" color={"#fff"} size={25} />
        </Pressable>
        <Text style={{ color: "#fff", fontSize: 17, fontWeight: "500" }}>
          Your Wallet
        </Text>
      </View>
      <View>
        <View
          style={[
            styles.flexRow,
            {
              marginTop: 20,
              transform: [{ rotate: "-20deg" }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.circle1,
              { transform: [{ translateX: leftCircleX }] },
            ]}
          ></Animated.View>
          <Animated.View
            style={[
              styles.circle2,
              { transform: [{ translateX: rightCircleX }] },
            ]}
          ></Animated.View>
        </View>
        <View style={{ marginTop: 10 }}>
          <IndexIndicators />
        </View>
        <Animated.View
          style={[
            styles.cardCont,
            { transform: [{ translateY: cardY }], opacity: cardOpacity },
          ]}
        >
          <View style={styles.card}></View>
        </Animated.View>
      </View>
      <View style={[styles.flexRow, { marginTop: 30, gap: 25 }]}>
        <Animated.View
          style={[styles.balanceBox, { transform: [{ translateX: leftBoxX }] }]}
        >
          <View style={[styles.flexRowBtw]}>
            <Text style={{ color: "#fff" }}>Balance</Text>
            <Text style={{ color: "green", fontSize: 30 }}>///</Text>
          </View>
          <View style={[styles.flexRow, { alignItems: "flex-end", gap: 2 }]}>
            <Text
              style={{
                color: "#fff",
                fontSize: 15,
                fontWeight: "700",
                marginBottom: 3,
              }}
            >
              BTC
            </Text>
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 25 }}>
              2.27641
            </Text>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.settingsBox,
            { transform: [{ translateX: rightBoxX }] },
          ]}
        >
          <Text style={{ color: "blue", fontSize: 30 }}>///</Text>
          <Text style={{ color: "#fff" }}>Settings</Text>
        </Animated.View>
      </View>
      <Animated.View
        style={[styles.bigBoxCont, { transform: [{ translateY: bigBoxY }] }]}
      >
        <View style={styles.bigBox}>
          <View style={[styles.flexRow, { gap: 10, paddingBottom: 15 }]}>
            <Pressable style={styles.searchCont}>
              <IonIcons name="search" color={"#fff"} size={15} />
            </Pressable>
            <View style={styles.optionsCont}>
              <Text style={styles.optionsTxt}>Period</Text>
            </View>
            <View style={styles.optionsCont}>
              <Text style={styles.optionsTxt}>Amount</Text>
            </View>
            <View style={styles.optionsCont}>
              <Text style={styles.optionsTxt}>Product</Text>
            </View>
            <View style={styles.optionsCont}>
              <Text style={styles.optionsTxt}>Type</Text>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={{ gap: 10, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            <PaymentHistory
              amount={0.00243}
              paymentType={"btc"}
              date={"23 March"}
            />
            <PaymentHistory
              amount={0.00243}
              paymentType={"btc"}
              date={"23 March"}
            />
            <PaymentHistory
              amount={0.00243}
              paymentType={"btc"}
              date={"23 March"}
            />
          </ScrollView>
          <View style={styles.seeAllCont}>
            <TouchableOpacity style={styles.seeAllBtn}>
              <Text style={{ color: "#fff" }}>See all</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  circle1: {
    backgroundColor: "yellow",
    height: width * 0.45,
    width: width * 0.45,
    borderRadius: (width * 0.45) / 2,
  },
  circle2: {
    backgroundColor: "yellow",
    height: width * 0.55,
    width: width * 0.55,
    borderRadius: (width * 0.55) / 2,
  },
  cardCont: {
    paddingHorizontal: 30,
    position: "absolute",
    width: "100%",
    top: 25,
  },
  card: {
    backgroundColor: "pink",
    height: 170,
    width: "100%",
    borderRadius: 15,
  },
  optionsCont: {
    height: 25,
    paddingHorizontal: 7,
    borderWidth: 0.5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  optionsTxt: { fontSize: 12, color: "#fff" },
  backBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  balanceBox: {
    flex: 1,
    height: 100,
    backgroundColor: boxBg,
    borderRadius: 20,
    marginLeft: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
  },
  settingsBox: {
    backgroundColor: boxBg,
    height: 100,
    width: 100,
    borderRadius: 20,
    marginRight: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  bigBoxCont: {
    marginTop: 30,
    height: 240,
    width: "100%",
    paddingHorizontal: 30,
  },
  bigBox: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    backgroundColor: boxBg,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchCont: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#fff",
  },
  seeAllCont: {
    width: "100%",
    backgroundColor: "rgba(102, 112, 114, 0.9)",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: 7,
    paddingBottom: 10,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  seeAllBtn: {
    height: 25,
    paddingHorizontal: 10,
    backgroundColor: "#44B3CE",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
