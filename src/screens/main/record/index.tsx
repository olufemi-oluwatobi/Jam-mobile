import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Platform,
  Dimensions,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import CommentItem, { CommentItemProps } from "../../../components/CommentItem";
import RepliesModal from "../../../components/RepliesModal";
import CommentModal from "../../../components/CommentModal";
import CommentSection from "../../../components/commentSegment";
import useTheme from "../../../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import TrackCard from "../../../components/TrackCard";
import { HStack, VStack, Avatar } from "native-base";
import { MainScreenProps } from "../../../interfaces";

const sampleData: SampleData = {
  record: {
    id: "1",
    name: "Album Name",
    creator: "Artist Name",
    creatorAvatar:
      "https://i.pinimg.com/564x/34/47/62/344762e23100bb9422063512943b4290.jpg",
    rating: 4.5,
    listeners: 123456,
    image:
      "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt ipsum felis, id aliquet odio convallis eu. Donec luctus gravida orci in consectetur. Fusce consequat massa ac ligula consequat, quis fermentum est varius. Duis non ex eget lacus aliquet laoreet at at orci. Fusce feugiat eros sit amet mauris feugiat, eget rhoncus purus vestibulum. Vestibulum ullamcorper a massa ut volutpat. Nam auctor euismod dui. Sed nec tincidunt nibh. Fusce sed arcu ultrices, bibendum tellus a, lacinia ipsum. Aenean porta quam odio, eu aliquam massa molestie eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    listenerAvatars: [
      "https://i.pinimg.com/564x/34/47/62/344762e23100bb9422063512943b4290.jpg",
      "https://i.pinimg.com/564x/34/47/62/344762e23100bb9422063512943b4290.jpg",
      "https://i.pinimg.com/564x/34/47/62/344762e23100bb9422063512943b4290.jpg",
    ],
    songs: [
      {
        id: "1",
        name: "Song 1",
        artist: "Artist 1",
        rating: 4.5,
        listeners: 123456,
        image:
          "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
      },
      {
        id: "2",
        name: "Song 2",
        artist: "Artist 2",
        rating: 4.2,
        listeners: 1234,
        image:
          "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
      },
      {
        id: "3",
        name: "Song 3",
        artist: "Artist 3",
        rating: 3.9,
        listeners: 5678,
        image:
          "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
      },
      {
        id: "4",
        name: "Song 4",
        artist: "Artist 4",
        rating: 4.1,
        listeners: 9012,
        image:
          "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
      },
      {
        id: "5",
        name: "Song 4",
        artist: "Artist 4",
        rating: 4.1,
        listeners: 9012,
        image:
          "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
      },
      {
        id: "6",
        name: "Song 4",
        artist: "Artist 4",
        rating: 4.1,
        listeners: 9012,
        image:
          "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
      },
    ],
  },
};

const dummyCommentData: CommentItemProps[] = [
  {
    name: "John Doe",
    avatar:
      "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
    comment:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or ",
    time: "2 hours ago",
    numReplies: 3,
    replies: [
      {
        name: "Alice Johnson",
        avatar:
          "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
        comment: "Thanks for sharing this, John!",
        time: "1 hour ago",
        numReplies: 0,
      },
      {
        name: "Bob Smith",
        avatar:
          "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
        comment: "I have a question about the first paragraph...",
        time: "30 minutes ago",
        numReplies: 0,
      },
      {
        name: "Charlie Brown",
        avatar:
          "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
        comment: "Can you explain the second paragraph in more detail?",
        time: "10 minutes ago",
        numReplies: 0,
      },
    ],
  },
  {
    name: "Jane Smith",
    avatar:
      "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
    comment: "Thanks for sharing this!",
    time: "1 day ago",
    numReplies: 0,
  },
  {
    name: "Bob Johnson",
    avatar:
      "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
    comment: "I have a question about something in the video...",
    time: "3 days ago",
    numReplies: 1,
    replies: [
      {
        name: "John Doe",
        avatar:
          "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
        comment: "Sure, what's your question, Bob?",
        time: "2 days ago",
        numReplies: 0,
      },
    ],
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

const RecordPage: React.FC<MainScreenProps> = ({ navigation }) => {
  const { record } = sampleData;
  const theme = useTheme();
  const [isVisible, setModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState<
    CommentItemProps | undefined | null
  >(null);
  const [blurRadius, setBlurRadius] = useState(0);
  const { height, width } = useWindowDimensions();
  const [showMore, setShowMore] = useState<boolean>(false);

  const [headerBackgroundColor, setHeaderBackgroundColor] =
    useState("transparent");

  useEffect(() => {
    if (selectedComment) {
      setModalVisible(false);
    }
  }, [selectedComment]);

  const imageHeight = useMemo(() => height / 2.5, [height]);
  console.log("imageHeight", height);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newBlurRadius = Math.min(offsetY / imageHeight, 1) * 10;
    const newHeaderBackgroundColor = `rgba(0, 0, 0, ${Math.min(
      offsetY / imageHeight,
      1
    )})`;
    setBlurRadius(newBlurRadius);

    setHeaderBackgroundColor(newHeaderBackgroundColor);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <View style={{ flex: 1 }}>
      <CommentModal
        visible={isVisible}
        closeModal={() => setModalVisible(false)}
        commentName="Comment Name"
      >
        {dummyCommentData.map((comment, index) => (
          <CommentItem
            onReplyClick={() => setSelectedComment(comment)}
            key={index}
            {...comment}
          />
        ))}
      </CommentModal>
      {selectedComment && (
        <RepliesModal
          comment={selectedComment}
          goBack={() => {
            setSelectedComment(null);
            setModalVisible(true);
          }}
          replies={selectedComment?.replies as CommentItemProps[]}
          commentName="Replies"
          closeModal={() => setSelectedComment(null)}
          visible={Boolean(selectedComment)}
        ></RepliesModal>
      )}
      <View style={[styles.header, { backgroundColor: "#000" }]}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="#fff"
          onPress={() => console.log("here")}
          style={{ marginLeft: 10 }}
        />
      </View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={[styles.container, { backgroundColor: theme.colors.black }]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Image
            style={{ width: 250, height: 250, borderRadius: 10 }}
            source={{ uri: record.image }}
          ></Image>
          <HStack style={{ alignItems: "center", marginTop: 20 }}>
            <Text
              style={[
                styles.recordName,
                {
                  color: theme.colors.white,
                  fontWeight: "bold",
                },
              ]}
            >
              {record.name}
            </Text>
            <View style={[styles.badge, { backgroundColor: "#232b2b" }]}>
              <Ionicons name="star" size={20} color="#f3d73d" />
              <Text style={[styles.badgeText, {}]}>{record.rating}</Text>
            </View>
          </HStack>

          <View style={[styles.creatorInfo, { marginTop: 10 }]}>
            <TouchableHighlight
              onPress={() => navigation.navigate("Profile", { id: record.id })}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: record.creatorAvatar }}
                  style={{ width: 20, height: 20, borderRadius: 50 }}
                />
                <Text
                  style={[styles.creatorName, { color: theme.colors.white }]}
                >
                  {record.creator}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                {showMore
                  ? record.description
                  : record.description.slice(0, 100)}
                <Text
                  style={[styles.showMore, { color: theme.colors.brand }]}
                  onPress={toggleShowMore}
                >
                  {showMore ? " show less" : " show less"}
                </Text>
              </Text>
            </View>
          </View>
          <HStack
            style={{
              justifyContent: "space-between",
              width,
              paddingHorizontal: 15,
              marginTop: 20,
            }}
          >
            <TouchableHighlight
              style={[
                styles.button,
                { backgroundColor: theme.colors.darkGrey },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="play" size={24} color={theme.colors.brand} />
                <Text
                  style={[styles.buttonText, { color: theme.colors.brand }]}
                >
                  Play
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.button,
                { backgroundColor: theme.colors.darkGrey },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="heart" size={24} color={theme.colors.brand} />
                <Text
                  style={[styles.buttonText, { color: theme.colors.brand }]}
                >
                  Like
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.button,
                { backgroundColor: theme.colors.darkGrey },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="star" size={24} color={theme.colors.brand} />
                <Text
                  style={[styles.buttonText, { color: theme.colors.brand }]}
                >
                  Rate
                </Text>
              </View>
            </TouchableHighlight>
          </HStack>
          <HStack
            style={{
              marginVertical: 20,
              width,
              paddingLeft: 30,
              alignItems: "center",
            }}
          >
            <Avatar.Group
              style={{
                borderColor: theme.colors.black,
              }}
              _avatar={{
                size: "sm",
                borderColor: "red",
              }}
              max={3}
            >
              <Avatar
                style={{
                  borderColor: theme.colors.black,
                }}
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              >
                AJ
              </Avatar>
              <Avatar
                style={{
                  borderColor: theme.colors.black,
                }}
                source={{
                  uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                }}
              >
                TE
              </Avatar>
              <Avatar
                style={{
                  borderColor: theme.colors.black,
                }}
                source={{
                  uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              >
                JB
              </Avatar>
              <Avatar
                style={{
                  borderColor: theme.colors.black,
                }}
                bg={theme.colors.brand}
                source={{
                  uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                }}
              >
                TS
              </Avatar>
              <Avatar
                bg="green.500"
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              >
                AJ
              </Avatar>
              <Avatar
                bg="cyan.500"
                source={{
                  uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                }}
              >
                TE
              </Avatar>
              <Avatar
                bg="indigo.500"
                source={{
                  uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              >
                JB
              </Avatar>
              <Avatar
                bg="amber.500"
                source={{
                  uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                }}
              >
                TS
              </Avatar>
            </Avatar.Group>
            <Text
              style={{
                color: theme.colors.grey,
                marginHorizontal: 10,
                marginRight: 50,
                textAlign: "left",
                fontSize: 16,
              }}
            >
              Listened to by olaitan, markus and marque 50 others
            </Text>
          </HStack>
        </View>

        {/* <ImageBackground
          source={{ uri: record.image }}
          blurRadius={blurRadius}
          style={[
            styles.image,
            {
              height: imageHeight,
              justifyContent: "flex-end",
            },
          ]}
        ></ImageBackground> */}

        <View>
          <CommentSection
            triggerExpand={() => setModalVisible(true)}
            comment={{
              avatar: "https://picsum.photos/id/1025/200/200",
              author: "John Doe",
              text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed",
              time: "2 hours ago",
            }}
          />
          <View style={{ marginTop: 20, padding: 10 }}>
            {record.songs.map((song) => (
              <TrackCard key={song.id} {...song} />
            ))}
          </View>
        </View>

        {/* <Fab
          position="bottom-right"
          icon={<Icon name="thumbs-up-outline" />}
          label="Vote"
        /> */}
        {/* <Fab
          position="bottom-right"
          icon={<Icon name="chat" />}
          label="Comments"
          style={{ marginBottom: 130 }}
          badge={{ content: 14, status: "success" }}
        /> */}
      </ScrollView>
    </View>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    width: "100%",
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  creatorName: {
    marginLeft: 5,
    fontSize: 16,
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
    textAlign: "center",
    lineHeight: 22,
    color: "#B0B0B0",
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    paddingVertical: 8,
    backgroundColor: "#555",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
  badge: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default RecordPage;
