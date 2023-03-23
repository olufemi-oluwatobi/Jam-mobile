import React from "react";
import useTheme from "../../hooks/useTheme";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// export interface ReplyItemProps {
//   name: string;
//   avatar: string;
//   comment: string;
//   time: string;
// }

// Write props for CommentItem component
export interface CommentItemProps {
  name: string;
  avatar: string;
  comment: string;
  time: string;
  numReplies: number;
  replies?: CommentItemProps[];
  onReplyClick?: () => void;
  style?: StyleProp<ViewStyle>;
}

export type ReplyItemProp = CommentItemProps;

const CommentItem = ({
  name,
  avatar,
  comment,
  time,
  numReplies,
  onReplyClick,
  style,
}: CommentItemProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.commentContainer,
        { backgroundColor: theme.colors.black },
        style,
      ]}
    >
      <Image style={styles.avatar} source={{ uri: avatar }} />
      <View style={styles.commentTextContainer}>
        <Text style={[styles.name, { color: theme.colors.grey }]}>
          {name} . <Text style={styles.time}>{time}</Text>
        </Text>
        <Text style={[styles.comment, { color: "#fff" }]}>{comment}</Text>
        <TouchableHighlight onPress={() => onReplyClick && onReplyClick()}>
          <Text style={[styles.numReplies, { color: theme.colors.brand }]}>
            {numReplies} replies
          </Text>
        </TouchableHighlight>
      </View>
      <FontAwesome name="ellipsis-v" size={16} color={theme.colors.grey} />
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 10,
  },
  commentTextContainer: {
    flex: 1,
    paddingBottom: 10,
    paddingRight: 30,
  },
  name: {
    color: "#fff",
    fontSize: 16,
  },
  comment: {
    marginTop: 5,
    marginBottom: 10,
    lineHeight: 20,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    color: "#888",
    fontSize: 12,
  },
  rightSection: {
    flexDirection: "row",
  },
  numReplies: {
    marginTop: 10,
    fontSize: 18,
    color: "#888",
  },
});

export default CommentItem;
