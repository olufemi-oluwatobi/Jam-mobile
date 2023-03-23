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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Write props for the component
type CommentModalProps = {
  visible: boolean;
  commentName: string;
  closeModal: () => void;
  children?: React.ReactNode;
};
const CommentModal: React.FC<CommentModalProps> = ({
  children,
  visible,
  commentName,
  closeModal,
}) => {
  const theme = useTheme();
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={[styles.modalContainer]}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>{commentName}</Text>
          <TouchableHighlight onPress={closeModal}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableHighlight>
        </View>
        <ScrollView
          style={[styles.modalContent, { backgroundColor: theme.colors.black }]}
        >
          {children}
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
    height: "60%",
    maxHeight: height / 2,
  },
});

export default CommentModal;
