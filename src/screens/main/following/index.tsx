import React, { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { View, Text } from "native-base";
import useTheme from "../../../hooks/useTheme";
import Header from "../../../components/header";
import { FollowerList } from "../../../components/followerCard";

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

const followers = [
  {
    name: "John Smith",
    bio: "Software engineer",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    isFollowing: false,
  },
  {
    name: "Emily Johnson",
    bio: "Designer",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    isFollowing: true,
  },
  {
    name: "David Lee",
    bio: "Entrepreneur",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    isFollowing: false,
  },
  {
    name: "Maria Garcia",
    bio: "Student",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    isFollowing: true,
  },
  {
    name: "Michael Davis",
    bio: "Developer",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    isFollowing: false,
  },
  {
    name: "Samantha Johnson",
    bio: "Marketing",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    isFollowing: false,
  },
  {
    name: "William Jones",
    bio: "Writer",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    isFollowing: true,
  },
  {
    name: "Olivia Brown",
    bio: "Artist",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    isFollowing: false,
  },
  {
    name: "Robert Wilson",
    bio: "Musician",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    isFollowing: true,
  },
  {
    name: "Ava Taylor",
    bio: "Photographer",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    isFollowing: false,
  },
  {
    name: "Daniel Martinez",
    bio: "Designer",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    isFollowing: false,
  },
  {
    name: "Mia Anderson",
    bio: "Student",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    isFollowing: true,
  },
  {
    name: "Joshua Rodriguez",
    bio: "Engineer",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    isFollowing: false,
  },
  {
    name: "Chloe Hernandez",
    bio: "Writer",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    isFollowing: false,
  },
  {
    name: "Ethan Lee",
    bio: "Developer",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    isFollowing: true,
  },
  {
    name: "Isabella Perez",
    bio: "Artist",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    isFollowing: false,
  },
  {
    name: "Christopher Green",
    bio: "Musician",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    isFollowing: true,
  },
  {
    name: "Sophia Flores",
    bio: "Photographer",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    isFollowing: true,
  },
];

const ActivityPage: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { height, width } = useWindowDimensions();
  const theme = useTheme();
  const tabHeight = height - 100;
  const renderScene = ({ route }: Scene) => {
    switch (route.key) {
      case "followers":
        return <FollowerList followers={followers} />;
      case "following":
        return <FollowerList followers={followers} />;
      case "artists":
        return <FollowerList followers={followers} />;
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
    { key: "followers", title: "Followers" },
    { key: "following", title: "Following" },
    { key: "artists", title: "Artists" },
  ];

  return (
    <View>
      <Header showActionsButtons={false} title={"Following"} />
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
