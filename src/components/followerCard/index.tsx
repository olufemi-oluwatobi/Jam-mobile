import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import useTheme from "../../hooks/useTheme";
import { Avatar } from "native-base";

export type FollowerCardProps = {
  name: string;
  bio: string;
  avatar: string;
  showFollowButton?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onUnfollow?: () => void;
};

const FollowerCard = ({
  name,
  bio,
  avatar,
  showFollowButton = true,
  isFollowing = false,
  onFollow,
  onUnfollow,
}: FollowerCardProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.followerCard,
        { borderBottomColor: theme.colors.darkGrey },
      ]}
    >
      <Avatar size={"md"} source={{ uri: avatar }} />
      <View style={styles.followerDetails}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>
      {showFollowButton && (
        <TouchableOpacity
          onPress={isFollowing ? onUnfollow : onFollow}
          style={[
            styles.followButton,
            isFollowing ? styles.unfollowButton : null,
          ]}
        >
          <Text style={styles.followButtonText}>
            {isFollowing ? "Unfollow" : "Follow"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export type FollowerListProps = {
  followers: FollowerCardProps[];
};

const FollowerList = ({ followers }: FollowerListProps) => {
  return (
    <ScrollView style={styles.followerList}>
      {followers.map((follower, index) => (
        <FollowerCard {...follower} key={index} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  followerCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
  },
  followerDetails: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  bio: {
    color: "#777",
  },
  followButton: {
    backgroundColor: "#0095F6",
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  unfollowButton: {
    backgroundColor: "#E5E5E5",
  },
  followButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  followerList: {
    flex: 1,
    backgroundColor: "#000",
    paddingBottom: 500,
  },
});

export { FollowerList, FollowerCard };
