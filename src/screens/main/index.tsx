import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./home";
import ActivityScreen from "./activities";
import EditProfilePage from "./userProfile/edit";
import VotesScreen from "./voting";
import RecordScreen from "./record";
import ProfileScreen from "./userProfile";
import FollowingScreen from "./following";
import { Ionicons } from "@expo/vector-icons";
import { MainStackParamList } from "../../interfaces";

const Tab = createBottomTabNavigator<MainStackParamList>();

const icons = {
  Home: ["ios-home", "ios-home-outline"],
  People: ["ios-people", "ios-people-outline"],
  Record: ["ios-people", "ios-people-outline"],
  Activity: ["ios-flash", "ios-flash-outline"],
  Votes: ["ios-checkmark-circle", "ios-checkmark-circle-outline"],
  Music: ["ios-musical-notes", "ios-musical-notes-outline"],
};

const MainScreen: FC = () => {
  // let previousRouteName: keyof MainStackParamList | undefined = undefined;
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
        name="Activity"
        component={ActivityScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
        name="Record"
        component={RecordScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
        name="Following"
        component={FollowingScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
        name="Profile"
        component={ProfileScreen}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
        name="EditProfile"
        component={EditProfilePage}
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
