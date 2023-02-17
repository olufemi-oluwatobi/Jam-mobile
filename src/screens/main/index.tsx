import React, { FC } from "react";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import HomeScreen from "./home";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

type MainScreenParamList = {
  Home: undefined;
  People: undefined;
  Votes: undefined;
  Music: undefined;
};

const Tab = createBottomTabNavigator<MainScreenParamList>();

const icons = {
  Home: ["ios-home", "ios-home-outline"],
  People: ["ios-people", "ios-people-outline"],
  Votes: ["ios-checkmark-circle", "ios-checkmark-circle-outline"],
  Music: ["ios-musical-notes", "ios-musical-notes-outline"],
};

const VotesScreen = () => {
  return (
    <View>
      <Text>VotesScreen</Text>
    </View>
  );
};

const MainScreen: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const [iconName, iconOutlineName] =
            icons[route.name as keyof typeof icons];
          const icon: any = focused ? iconName : iconOutlineName;
          return <Ionicons name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="People"
        component={VotesScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Votes"
        component={VotesScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Music"
        component={VotesScreen}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
