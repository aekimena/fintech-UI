import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../../screens/bottomTabs/Home";
import { Notifications } from "../../screens/bottomTabs/Notifications";
import { Portfolio } from "../../screens/bottomTabs/Portfolio";
import { Prices } from "../../screens/bottomTabs/Prices";
import IonIcons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { AddScreen } from "../../screens/bottomTabs/AddScreen";

function TabBar({ state, descriptors, navigation }) {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.tabsCont, { width: width }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        let icon;

        const isFocused = state.index === index;
        let iconColor = isFocused ? "#fff" : "#777";

        switch (label) {
          case "Dashboard":
            icon = <IonIcons name="grid" size={17} color={iconColor} />;

            break;
          case "Prices":
            icon = (
              <FontAwesome name="chart-simple" size={17} color={iconColor} />
            );

            break;
          case "Add":
            icon = (
              <View style={styles.outerCircle}>
                <View style={styles.innerCircle}>
                  <IonIcons name="add" color={"#fff"} size={20} />
                </View>
              </View>
            );
            break;
          case "Portfolio":
            icon = (
              <FontAwesome name="layer-group" size={17} color={iconColor} />
            );

            break;
          case "Notifications":
            icon = (
              <FontAwesome
                name="bell"
                size={17}
                solid={true}
                color={iconColor}
              />
            );

            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <TouchableOpacity
            onPress={onPress}
            style={styles.tabs}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={index}
          >
            {icon}
            {label !== "Add" && (
              <Text style={[{ color: iconColor, fontSize: 10 }]}>{label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ...

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen component={Home} name="Dashboard" />

      <Tab.Screen component={Portfolio} name="Portfolio" />
      <Tab.Screen component={AddScreen} name="Add" />
      <Tab.Screen component={Prices} name="Prices" />
      <Tab.Screen component={Notifications} name="Notifications" />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabsCont: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    backgroundColor: "#333",
  },
  tabs: {
    alignItems: "center",
    gap: 2,
  },
  outerCircle: {
    backgroundColor: "rgba(83, 159, 213, 0.02)",
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    justifyContent: "center",
    alignItems: "center",
    top: -60,
    position: "absolute",
  },
  innerCircle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#44B3CE",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
});
