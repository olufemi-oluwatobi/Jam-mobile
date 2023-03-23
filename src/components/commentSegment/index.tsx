import React from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "../../hooks/useTheme";

const Comment = ({
  comment,
  triggerExpand,
}: {
  comment: {
    avatar: string;
    author: string;
    text: string;
    time: string;
  };
  triggerExpand: () => void;
}) => {
  const theme = useTheme();

  return (
    <TouchableHighlight onPress={() => triggerExpand()}>
      <View
        style={[styles.comment, { backgroundColor: theme.colors.darkGrey }]}
      >
        <View style={styles.topSection}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.commentText, { color: "#fff", fontSize: 16 }]}>
              Comments
            </Text>
            <Text
              style={[styles.commentCountText, { color: theme.colors.grey }]}
            >
              1.2K
            </Text>
          </View>

          <View style={styles.commentCount}>
            <TouchableHighlight
              onPress={() => triggerExpand()}
              style={styles.expandIcon}
            >
              <Ionicons
                name="chevron-down-outline"
                size={20}
                color={theme.colors.white}
              />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.commentDetails}>
          <Image
            source={{ uri: comment.avatar }}
            style={styles.commentAvatar}
          />
          <View style={styles.commentContent}>
            <Text style={[styles.commentAuthor, { color: theme.colors.white }]}>
              {comment.author}
            </Text>
            <Text
              style={[
                styles.commentText,
                { color: theme.colors.grey, marginTop: 10 },
              ]}
            >
              {comment.text}
            </Text>
            <Text style={styles.commentTime}>{comment.time}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  comment: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "red",
    boxSHadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentText: {
    fontSize: 12,
    lineHeight: 17,
  },
  commentCount: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentCountText: {
    marginLeft: 10,
  },
  expandIcon: {
    marginLeft: 10,
  },
  commentDetails: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
  },
  commentAvatar: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  commentContent: {
    marginLeft: 10,
    textSize: 8,
    flex: 1,
  },
  commentAuthor: {
    fontWeight: "bold",
    fontSize: 14,
  },
  commentTime: {
    color: "#777",
    fontSize: 12,
    marginTop: 10,
  },
});

export default Comment;
