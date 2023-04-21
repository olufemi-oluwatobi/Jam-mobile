import React, { useState } from "react";
import {
  Platform,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { useAuth } from "../../../hooks/useAuth";
import { Text, VStack, View, HStack } from "native-base";
import useTheme from "../../../hooks/useTheme";
import Header from "./profileHeader";
import BioSection from "./bioSection";
import Segment, { SegmentData } from "../../../components/TimelineSegment";
import {
  ActivityList,
  ActivityCardProps,
} from "../../../components/activityCard";
import { MainScreenProps } from "../../../interfaces";

const { width } = Dimensions.get("window");

const favoriteArtists: Array<SegmentData> = [
  {
    type: "persona",
    data: {
      id: 1,
      name: "Taylor Swift",
      image:
        "https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    variant: "lg",
  },
  {
    type: "persona",
    data: {
      id: 2,
      name: "Kendrick Lamar",
      image:
        "https://i.pinimg.com/564x/ca/fb/56/cafb561d1b88ce0b04f14a2ee3d01936.jpg",
    },
    variant: "lg",
  },
  {
    type: "persona",
    data: {
      id: 3,
      name: "Ariana Grandinho",
      image:
        "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
    },
    variant: "lg",
  },
  {
    type: "persona",
    data: {
      id: 5,
      name: "Ariana Grandoria",
      image:
        "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
    },
    variant: "lg",
  },
  {
    type: "persona",
    data: {
      id: 6,
      name: "Ariana Gramillia",
      image:
        "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
    },
    variant: "lg",
  },
];

const dummyUserActivities: ActivityCardProps[] = [
  {
    userName: "John Doe",
    action: "Posted a new article",
    avatar: "https://picsum.photos/200",
    week: 12,
  },
  {
    userName: "Jane Smith",
    action: "Commented on a post",
    avatar: "https://picsum.photos/200",
    week: 12,
  },
  {
    userName: "Bob Johnson",
    action: "Liked a photo",
    avatar: "https://picsum.photos/200",
    week: 11,
  },
  {
    userName: "Alice Brown",
    action: "Shared a link",
    avatar: "https://picsum.photos/200",
    week: 11,
  },
];

const playlists: Array<SegmentData> = [
  {
    type: "record",
    data: {
      id: 1,
      name: "New Releases Playlist",
      creator: "Spotify",
      image:
        "https://i.pinimg.com/236x/60/4f/cd/604fcd321ef98965939055670ad0502f.jpg",
    },
    variant: "lg",
  },
  {
    type: "record",
    data: {
      id: 2,
      name: "Hip Hop Playlist",
      creator: "Apple Music",
      image:
        "https://i.pinimg.com/236x/b3/24/16/b324166e90b9911b692f688b6000605d.jpg",
    },
    variant: "lg",
  },
  {
    type: "record",
    data: {
      id: 3,
      name: "Pop Playlist",
      creator: "Tidal",
      image:
        "https://i.pinimg.com/236x/b2/0a/a8/b20aa88d7ebae840541f6e152653dba3.jpg",
    },
    variant: "lg",
  },
];

interface Record {
  id: string;
  name: string;
  creator: string;
  creatorAvatar: string;
  rating: number;
  listeners: number;
  image: string;
  description: string;
  listenerAvatars: string[];
  songs: Track[];
}

interface Track {
  id: string;
  name: string;
  artist: string;
  rating: number;
  listeners: number;
  image: string;
}

interface SampleData {
  record: Record;
}

const ProfilePage: React.FC<MainScreenProps> = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const {
    state: { user },
  } = useAuth();

  return (
    <ScrollView
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      // onScroll={handleScroll}
    >
      <Header navigation={navigation} title={"Mayanma"} />
      <BioSection isUser={true} navigation={navigation} />
      <Segment
        style={{
          headerStyle: { paddingLeft: 20 },
          contentStyle: { paddingLeft: 20 },
          labelStyle: { fontSize: 16, color: theme.colors.grey },
          wrapperStyle: { backgroundColor: "#000" },
        }}
        onItemPress={(item) => navigation.navigate("Record", { item })}
        text="Favourite Artists"
        data={favoriteArtists}
      />
      <Segment
        onSeeAllPress={() => console.log("see all")}
        style={{
          headerStyle: { paddingLeft: 20 },
          contentStyle: { paddingLeft: 20 },
          labelStyle: { fontSize: 16, color: theme.colors.grey },
          wrapperStyle: { backgroundColor: "#000" },
        }}
        onItemPress={(item) => navigation.navigate("Record", { item })}
        text="Playlists"
        data={playlists}
      />
      <Segment
        onSeeAllPress={() => console.log("see all")}
        style={{
          headerStyle: { paddingLeft: 20 },
          contentStyle: { paddingLeft: 20 },
          labelStyle: { fontSize: 16, color: theme.colors.grey },
          wrapperStyle: { backgroundColor: "#000" },
        }}
        onItemPress={(item) => navigation.navigate("Record", { item })}
        text="Recent Favourites"
        data={playlists}
      />
      <VStack style={{ paddingVertical: 30, backgroundColor: "#000" }}>
        <HStack
          style={{
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              color: theme.colors.white,
              paddingHorizontal: 20,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Recent Activities
          </Text>
          <TouchableHighlight>
            <View
              style={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "grey",
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: theme.colors.grey,
                }}
              >
                See all
              </Text>
            </View>
          </TouchableHighlight>
        </HStack>

        <ActivityList activities={dummyUserActivities}></ActivityList>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  infoWrapper: {
    width,
    paddingHorizontal: 12,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  countWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  countItem: {
    alignItems: "center",
    marginRight: 25,
    marginTop: 10,
  },
  count: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  countLabel: {
    fontSize: 14,
    marginLeft: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
  },
  header: {
    width: "100%",
    position: "absolute",
    zIndex: 100,
    top: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 40 : 20,
    paddingBottom: 10,
  },
  image: {
    width: "100%",
  },
  recordName: {
    fontSize: 24,
    color: "white",
  },
  playButton: {
    borderRadius: 100,
    width: 60,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonIcon: {
    color: "#000",
  },
  segment: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  creatorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  creatorName: {
    marginLeft: 10,

    fontSize: 16,
    fontWeight: "bold",
  },
  ratingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 5,
    color: "#f3d73d",
    fontWeight: "bold",
  },
  listeners: {
    marginTop: 5,
    fontBold: "bold",
    color: "#B0B0B0",
  },
  descriptionContainer: {
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#B0B0B0",
  },
  tabBar: {
    backgroundColor: "#000",
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
  },
  indicator: {
    backgroundColor: "#000",
  },
  showMore: {
    fontWeight: "bold",
  },
  showLess: {
    color: "blue",
    fontWeight: "bold",
  },
  listenerAvatars: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  trackList: {
    flex: 1,
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 20,
    marginRight: 20,
  },
  floatingButton: {
    marginBottom: 10,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box: {
    width: "100%",
  },
  boxA: {
    backgroundColor: "white",
  },
  boxB: {
    backgroundColor: "#D8D8D8",
  },
});

export default ProfilePage;
