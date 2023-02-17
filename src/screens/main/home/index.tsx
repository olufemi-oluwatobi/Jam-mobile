import React from "react";
import { View, StyleSheet } from "react-native";
import useTheme from "../../../hooks/useTheme";
import { useAuth } from "../../../hooks/useAuth";
import Header from "../../../components/layout/Header";
import FilterHeader from "../../../components/layout/FilterHeader";
import Segment, { SegmentData } from "../../../components/TimelineSegment";
import { ScrollView } from "native-base";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const theme = useTheme();
  const { user } = useAuth();

  const filters = [
    { text: "Artists", onPress: () => {}, key: "artists" },
    { text: "Friends", onPress: () => {}, key: "friends" },
  ];

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

  const playlistsOfTheWeek: Array<SegmentData> = [
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

  const topChartAlbums: Array<SegmentData> = [
    {
      type: "record",
      data: {
        id: 1,
        name: "Sour",
        creator: "Olivia Rodrigo",
        image:
          "https://i.pinimg.com/236x/1e/1c/7c/1e1c7c23213d4a465401ef9d14855014.jpg",
      },
      variant: "xl",
    },
    {
      type: "record",
      data: {
        id: 2,
        name: "Happier Than Ever",
        creator: "Billie Eilish",
        image:
          "https://i.pinimg.com/236x/9a/8c/bb/9a8cbbd3aa4bcf26bc436f0a170dcc1d.jpg",
      },
      variant: "xl",
    },
    {
      type: "record",
      data: {
        id: 3,
        name: "Donda",
        creator: "Kanye West",
        image:
          "https://i.pinimg.com/236x/12/f3/9e/12f39e15156def730a046140a5b111db.jpg",
      },
      variant: "xl",
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header
          avatar={
            "https://images.unsplash.com/photo-1629297777109-167b5d2bbba4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          }
          headerText={"Good Morning"}
        />
        <FilterHeader
          activeFilter={"artists"}
          filters={filters}
          defaultColor={"#272626"}
          activeColor={theme.colors.brand}
        />
        <View style={styles.segmentWrapper}>
          <Segment text="Favorite Artists" data={favoriteArtists} />
          <Segment text="Playlists of the Week" data={playlistsOfTheWeek} />
          <Segment text="Top Chart Albums" data={topChartAlbums} />
          <Segment text="Favorite Artists" data={favoriteArtists} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1423",
    position: "relative",
  },
  segmentWrapper: {
    marginTop: 20,
    padding: 20,
  },
});

export default Home;
