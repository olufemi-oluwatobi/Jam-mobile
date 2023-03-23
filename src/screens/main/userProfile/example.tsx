// import React, { useState, useMemo, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableHighlight,
//   Platform,
//   Dimensions,
//   StyleSheet,
//   ScrollView,
//   useWindowDimensions,
//   NativeSyntheticEvent,
//   NativeScrollEvent,
//   Animated,
//   ListRenderItem,
// } from "react-native";
// import { HStack, VStack, Button } from "native-base";
// import RecordTabCard from "../../../components/RecordTabCard";
// import { Tabs } from "react-native-collapsible-tab-view";

// import { TabView, SceneMap, TabBar } from "react-native-tab-view";
// import { ImageBackground } from "react-native";
// import { CommentItemProps } from "../../../components/CommentItem";
// import { MainScreenProps } from "../../../interfaces";
// import useTheme from "../../../hooks/useTheme";
// import { Ionicons } from "@expo/vector-icons";

// const initialLayout = { width: Dimensions.get("window").width };

// const CommentsRoute = () => <Text style={{ color: "white" }}>Comments</Text>;
// const ActivityRoute = () => <Text>Activity</Text>;

// const playlists = [
//   {
//     id: 1,
//     name: "My Awesome Playlist",
//     image:
//       "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
//     likes: 10,
//     score: 4.5,
//   },
//   {
//     id: 2,
//     name: "Party Mix",
//     image:
//       "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
//     likes: 15,
//     score: 4.0,
//   },
//   {
//     id: 3,
//     name: "Road Trip Tunes",
//     image:
//       "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
//     likes: 20,
//     score: 4.8,
//   },
//   {
//     id: 1,
//     name: "My Awesome Playlist",
//     image:
//       "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
//     likes: 10,
//     score: 4.5,
//   },
//   {
//     id: 2,
//     name: "Party Mix",
//     image:
//       "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
//     likes: 15,
//     score: 4.0,
//   },
//   {
//     id: 3,
//     name: "Road Trip Tunes",
//     image:
//       "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
//     likes: 20,
//     score: 4.8,
//   },
// ];

// const PlaylistRoute = () => (
//   <ScrollView style={{ flex: 1 }}>
//     {playlists.map((playlist, index) => (
//       <RecordTabCard key={index} {...playlist} />
//     ))}
//   </ScrollView>
// );

// const sampleData: SampleData = {
//   record: {
//     id: "1",
//     name: "Album Name",
//     creator: "Artist Name",
//     creatorAvatar:
//       "https://i.pinimg.com/564x/34/47/62/344762e23100bb9422063512943b4290.jpg",
//     rating: 4.5,
//     listeners: 123456,
//     image:
//       "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt ipsum felis, id aliquet odio convallis eu. Donec luctus gravida orci in consectetur. Fusce consequat massa ac ligula consequat, quis fermentum est varius. Duis non ex eget lacus aliquet laoreet at at orci. Fusce feugiat eros sit amet mauris feugiat, eget rhoncus purus vestibulum. Vestibulum ullamcorper a massa ut volutpat. Nam auctor euismod dui. Sed nec tincidunt nibh. Fusce sed arcu ultrices, bibendum tellus a, lacinia ipsum. Aenean porta quam odio, eu aliquam massa molestie eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
//     listenerAvatars: [
//       "https://i.pinimg.com/564x/34/47/62/344762e23100bb9422063512943b4290.jpg",
//       "https://i.pinimg.com/564x/34/47/62/344762e23100bb9422063512943b4290.jpg",
//       "https://i.pinimg.com/564x/34/47/62/344762e23100bb9422063512943b4290.jpg",
//     ],
//     songs: [
//       {
//         id: "1",
//         name: "Song 1",
//         artist: "Artist 1",
//         rating: 4.5,
//         listeners: 123456,
//         image:
//           "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
//       },
//       {
//         id: "2",
//         name: "Song 2",
//         artist: "Artist 2",
//         rating: 4.2,
//         listeners: 1234,
//         image:
//           "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
//       },
//       {
//         id: "3",
//         name: "Song 3",
//         artist: "Artist 3",
//         rating: 3.9,
//         listeners: 5678,
//         image:
//           "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
//       },
//       {
//         id: "4",
//         name: "Song 4",
//         artist: "Artist 4",
//         rating: 4.1,
//         listeners: 9012,
//         image:
//           "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
//       },
//       {
//         id: "5",
//         name: "Song 4",
//         artist: "Artist 4",
//         rating: 4.1,
//         listeners: 9012,
//         image:
//           "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
//       },
//       {
//         id: "6",
//         name: "Song 4",
//         artist: "Artist 4",
//         rating: 4.1,
//         listeners: 9012,
//         image:
//           "https://i.pinimg.com/236x/1c/55/45/1c5545363c95407fca0ae9970e5a7ead.jpg",
//       },
//     ],
//   },
// };

// const dummyCommentData: CommentItemProps[] = [
//   {
//     name: "John Doe",
//     avatar:
//       "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
//     comment:
//       "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or ",
//     time: "2 hours ago",
//     numReplies: 3,
//     replies: [
//       {
//         name: "Alice Johnson",
//         avatar:
//           "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
//         comment: "Thanks for sharing this, John!",
//         time: "1 hour ago",
//         numReplies: 0,
//       },
//       {
//         name: "Bob Smith",
//         avatar:
//           "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
//         comment: "I have a question about the first paragraph...",
//         time: "30 minutes ago",
//         numReplies: 0,
//       },
//       {
//         name: "Charlie Brown",
//         avatar:
//           "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
//         comment: "Can you explain the second paragraph in more detail?",
//         time: "10 minutes ago",
//         numReplies: 0,
//       },
//     ],
//   },
//   {
//     name: "Jane Smith",
//     avatar:
//       "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
//     comment: "Thanks for sharing this!",
//     time: "1 day ago",
//     numReplies: 0,
//   },
//   {
//     name: "Bob Johnson",
//     avatar:
//       "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
//     comment: "I have a question about something in the video...",
//     time: "3 days ago",
//     numReplies: 1,
//     replies: [
//       {
//         name: "John Doe",
//         avatar:
//           "https://i.pinimg.com/236x/c6/c0/48/c6c0481e87db3068c6be8f9b52c25a33.jpg",
//         comment: "Sure, what's your question, Bob?",
//         time: "2 days ago",
//         numReplies: 0,
//       },
//     ],
//   },
// ];

// interface Record {
//   id: string;
//   name: string;
//   creator: string;
//   creatorAvatar: string;
//   rating: number;
//   listeners: number;
//   image: string;
//   description: string;
//   listenerAvatars: string[];
//   songs: Track[];
// }

// interface Track {
//   id: string;
//   name: string;
//   artist: string;
//   rating: number;
//   listeners: number;
//   image: string;
// }

// interface SampleData {
//   record: Record;
// }

// const Header: React.FC<
//   MainScreenProps & {
//     blurRadius: number;
//     headerBackgroundColor: string;
//   }
// > = ({ navigation, headerBackgroundColor, blurRadius }) => {
//   const { record } = sampleData;
//   const theme = useTheme();
//   // const [blurRadius, setBlurRadius] = useState(0);
//   const { height } = useWindowDimensions();

//   // const [headerBackgroundColor, setHeaderBackgroundColor] =
//   //   useState("transparent");

//   const imageHeight = useMemo(() => height / 5, [height]);

//   // const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//   //   const offsetY = event.nativeEvent.contentOffset.y;
//   //   const newBlurRadius = Math.min(offsetY / imageHeight, 1) * 10;
//   //   const newHeaderBackgroundColor = `rgba(0, 0, 0, ${Math.min(
//   //     offsetY / imageHeight,
//   //     1
//   //   )})`;
//   //   setBlurRadius(newBlurRadius);

//   //   setHeaderBackgroundColor(newHeaderBackgroundColor);
//   // };

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
//         <TouchableHighlight
//           onPress={() => navigation.canGoBack() && navigation.goBack()}
//         >
//           <Ionicons
//             name="chevron-back-outline"
//             size={30}
//             color="#fff"
//             onPress={() => console.log("here")}
//             style={{ marginLeft: 10 }}
//           />
//         </TouchableHighlight>
//       </View>
//       <View
//         // onScroll={handleScroll}
//         // scrollEventThrottle={16}
//         // showsVerticalScrollIndicator={false}
//         style={[styles.container, { backgroundColor: theme.colors.black }]}
//       >
//         <ImageBackground
//           source={{ uri: record.image }}
//           blurRadius={blurRadius}
//           resizeMode="cover"
//           style={[
//             styles.image,
//             {
//               height: imageHeight,
//               justifyContent: "flex-end",
//             },
//           ]}
//         ></ImageBackground>
//         <HStack style={[styles.infoWrapper]}>
//           <Image
//             style={[styles.avatar, { marginTop: -40 }]}
//             source={{ uri: record.image }}
//           ></Image>
//           <HStack style={{ marginTop: 15 }}>
//             <Button
//               style={{ borderRadius: 20, backgroundColor: "#fff" }}
//               _text={{ color: "black", fontWeight: "bold" }}
//               size="sm"
//             >
//               Follow
//             </Button>
//           </HStack>
//         </HStack>
//         <HStack>
//           <VStack style={{ padding: 12 }}>
//             <Text
//               style={[
//                 {
//                   marginTop: 4,
//                   fontSize: 24,
//                   fontWeight: "bold",
//                   color: theme.colors.white,
//                 },
//               ]}
//             >
//               Robyn Marschoff
//             </Text>
//             <Text
//               style={[{ marginTop: 4, fontSize: 16, color: theme.colors.grey }]}
//             >
//               @narjys
//             </Text>
//           </VStack>
//         </HStack>
//         <VStack style={{ paddingLeft: 12 }}>
//           <Text
//             style={[
//               {
//                 fontSize: 16,
//                 lineHeight: 24,
//                 color: theme.colors.white,
//               },
//             ]}
//           >
//             What is the difference between CEO and COO? If we want to explain
//             the difference between CEO and COO in one sentence, we'd say that
//           </Text>
//         </VStack>
//         <VStack
//           style={[
//             {
//               paddingHorizontal: 12,
//               justifyContent: "center",
//             },
//           ]}
//         >
//           <HStack style={styles.countWrapper}>
//             <HStack style={styles.countItem}>
//               <Text style={styles.count}>3,000</Text>
//               <Text style={[styles.countLabel, { color: theme.colors.grey }]}>
//                 Followers
//               </Text>
//             </HStack>
//             <HStack style={styles.countItem}>
//               <Text style={[styles.count]}>3,000</Text>
//               <Text style={[styles.countLabel, { color: theme.colors.grey }]}>
//                 Followers
//               </Text>
//             </HStack>
//           </HStack>
//         </VStack>
//       </View>
//     </View>
//   );
// };

// const HEADER_HEIGHT = 250;

// const DATA = [0, 1, 2, 3, 4];
// const identity = (v: unknown): string => v + "";

// const ProfilePage: React.FC<MainScreenProps> = ({ navigation }) => {
//   const renderItem: ListRenderItem<number> = React.useCallback(({ index }) => {
//     return (
//       <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
//     );
//   }, []);

//   const [blurRadius, setBlurRadius] = useState(0);
//   const { height } = useWindowDimensions();

//   const [headerBackgroundColor, setHeaderBackgroundColor] =
//     useState("transparent");

//   const imageHeight = useMemo(() => height / 5, [height]);

//   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const offsetY = event.nativeEvent.contentOffset.y;
//     const newBlurRadius = Math.min(offsetY / imageHeight, 1) * 10;
//     const newHeaderBackgroundColor = `rgba(0, 0, 0, ${Math.min(
//       offsetY / imageHeight,
//       1
//     )})`;
//     setBlurRadius(newBlurRadius);

//     setHeaderBackgroundColor(newHeaderBackgroundColor);
//   };

//   return (
//     <ScrollView   scrollEventThrottle={16}
//      showsVerticalScrollIndicator={false} onScroll={handleScroll}>
//       <Tabs.Container
//         renderHeader={() => (
//           <Header
//             headerBackgroundColor={headerBackgroundColor}
//             blurRadius={blurRadius}
//             navigation={navigation}
//           />
//         )}
//       >
//         <Tabs.Tab name="Playlists">
//           <Tabs.FlatList
//             data={DATA}
//             renderItem={renderItem}
//             keyExtractor={identity}
//           />
//         </Tabs.Tab>
//         <Tabs.Tab name="Comments">
//           {/* @ts-ignore */}
//           <Tabs.ScrollView>
//             <View style={[styles.box, styles.boxA]} />
//             <View style={[styles.box, styles.boxB]} />
//           </Tabs.ScrollView>
//         </Tabs.Tab>
//       </Tabs.Container>
//     </ScrollView>
//   );
// };

// const { height, width } = Dimensions.get("window");

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingBottom: 100,
//   },
//   infoWrapper: {
//     width,
//     paddingHorizontal: 12,
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   countWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   countItem: {
//     alignItems: "center",
//     marginRight: 25,
//     marginTop: 10,
//   },
//   count: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 14,
//   },
//   countLabel: {
//     fontSize: 14,
//     marginLeft: 4,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 100,
//     borderWidth: 2,
//     borderColor: "black",
//   },
//   header: {
//     width: "100%",
//     position: "absolute",
//     zIndex: 100,
//     top: 0,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingTop: Platform.OS === "ios" ? 40 : 20,
//     paddingBottom: 10,
//   },
//   image: {
//     width: "100%",
//   },
//   recordName: {
//     fontSize: 24,
//     color: "white",
//   },
//   playButton: {
//     borderRadius: 100,
//     width: 60,
//     height: 60,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   playButtonIcon: {
//     color: "#000",
//   },
//   segment: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   creatorInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   creatorName: {
//     marginLeft: 10,

//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   ratingInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   rating: {
//     marginLeft: 5,
//     color: "#f3d73d",
//     fontWeight: "bold",
//   },
//   listeners: {
//     marginTop: 5,
//     fontBold: "bold",
//     color: "#B0B0B0",
//   },
//   descriptionContainer: {
//     marginTop: 10,
//   },
//   description: {
//     fontSize: 14,
//     lineHeight: 22,
//     color: "#B0B0B0",
//   },
//   tabBar: {
//     backgroundColor: "#000",
//   },
//   label: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   indicator: {
//     backgroundColor: "#000",
//   },
//   showMore: {
//     fontWeight: "bold",
//   },
//   showLess: {
//     color: "blue",
//     fontWeight: "bold",
//   },
//   listenerAvatars: {
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     marginTop: 10,
//   },
//   trackList: {
//     flex: 1,
//   },
//   floatingButtonContainer: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     marginBottom: 20,
//     marginRight: 20,
//   },
//   floatingButton: {
//     marginBottom: 10,
//   },
//   headerActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   box: {
//     width: "100%",
//   },
//   boxA: {
//     backgroundColor: "white",
//   },
//   boxB: {
//     backgroundColor: "#D8D8D8",
//   },
// });

// export default ProfilePage;
// // ?
