import React, { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { View, Text } from "native-base";
import useTheme from "../../../hooks/useTheme";
import Header from "../../../components/header";
import ActivityList from "../../../components/activityCard";

interface Route {
  key: string;
  title: string;
}

interface Scene {
  route: Route;
}

interface Props {
  navigation: any;
}

const activities = [
  {
    userName: "John Smith",
    action: "completed a workout",
    week: 2,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    userName: "Jane Doe",
    action: "logged a run",
    week: 1,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    userName: "Alex Johnson",
    action: "shared a post",
    week: 3,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    userName: "Emily Brown",
    action: "liked a post",
    week: 4,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const YouActivityContent = () => <Text>Hello</Text>;

const FollowersActivityContent = () => <Text>Hello</Text>;

const ActivityPage: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { height, width } = useWindowDimensions();
  const theme = useTheme();
  const tabHeight = height - 100;
  const renderScene = ({ route }: Scene) => {
    switch (route.key) {
      case "you":
        return <ActivityList activities={activities} />;
      case "followers":
        return <ActivityList activities={activities} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: theme.colors.brand,
        width: 100,
        height: 5,
        marginRight: "auto",
        borderRadius: 5,
        alignSelf: "center",
        justifyContent: "center",
      }}
      style={styles.tabBar}
      activeColor="#fff"
      inactiveColor="#ddd"
      renderLabel={({ route, focused }) => (
        <Text
          style={{
            color: focused ? "#fff" : "#ddd",
            fontSize: 16,
            paddingRight: 10,
            fontWeight: focused ? "bold" : "normal",
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );

  const routes: Route[] = [
    { key: "you", title: "You" },
    { key: "followers", title: "Followers" },
  ];

  return (
    <View>
      <Header showActionsButtons={false} title={"Activities"} />
      <View
        style={{
          borderWidth: 1,
          height: tabHeight,
          width,
        }}
      >
        <TabView
          navigationState={{ index: activeTab, routes }}
          renderScene={renderScene}
          onIndexChange={setActiveTab}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#333",
    color: "white",
  },
  tabLabel: {
    color: "white",
    fontSize: 12,
  },
  tabIndicator: {
    backgroundColor: "#333",
  },
});

export default ActivityPage;
