import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
const routes = ["products", "camp"];
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.navigate(route.name, route.params);
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
          />
        )}
      >
        <Tab.Screen
          name="Videos"
          component={VideosScreen}
          options={{
            title: "Videos",
            tabBarLabel: "Videos",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="video" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{
            title: "News",
            tabBarLabel: "News",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="newspaper" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Camp"
          component={CampScreen}
          options={{
            title: "Camp",
            tabBarLabel: "Camp",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="basketball" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Shop"
          component={ShopScreen}
          options={{
            title: "Shop",
            tabBarLabel: "Shop",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="store" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Settings",
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="cog" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://reactnative.dev/docs/assets/p_cat2.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <Text>MSHTV</Text>
    </View>
  );
}
function NewsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">News</Text>
    </View>
  );
}
function CampScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Camp</Text>
    </View>
  );
}
function VideosScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Videos</Text>
    </View>
  );
}

function ShopScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Shop</Text>
      <Button
        title="Go to store"
        onPress={() => navigation.navigate("Videos")}
      />
      <Button
        title="Go to settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}
function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
