import React from "react";
import useTheme from "../../hooks/useTheme";
import {
  View,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
import { HStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import CommentItem, { CommentItemProps } from "../CommentItem";

export type RepliesModalProps = {
  visible: boolean;
  commentName: string;
  closeModal: () => void;
  goBack?: () => void;
  comment: CommentItemProps;
  replies: CommentItemProps[];
  style?: StyleProp<ViewStyle>;
};

const RepliesModal: React.FC<RepliesModalProps> = ({
  visible,
  commentName,
  closeModal,
  comment,
  replies,
  goBack,
}) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={[styles.modalContainer]}>
        <View style={styles.modalHeader}>
          <HStack>
            <TouchableHighlight onPress={goBack}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableHighlight>
            <Text style={[styles.modalHeaderText, { marginLeft: 10 }]}>
              {commentName}
            </Text>
            <View style={{ width: 24 }} />
          </HStack>
          <TouchableHighlight onPress={closeModal}>
            <Ionicons name="close" size={25} color="#fff" />
          </TouchableHighlight>
        </View>
        <ScrollView
          style={[styles.modalContent, { backgroundColor: theme.colors.black }]}
        >
          <CommentItem style={[{ backgroundColor: "black" }]} {...comment} />
          <View style={[{ paddingLeft: width - (width - 30) }]}>
            {replies.map((reply, index) => (
              <CommentItem
                style={{ marginBottom: -15 }}
                key={index}
                {...reply}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#212121",
  },
  modalHeaderText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "#fff",
    maxHeight: height / 2,
  },
});

export default RepliesModal;
