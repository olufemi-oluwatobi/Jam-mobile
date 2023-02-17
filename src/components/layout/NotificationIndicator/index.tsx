import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import useTheme from "../../../hooks/useTheme";

type Props = {
  count: number;
};

const NotificationIndicator: React.FC<Props> = ({ count }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {count > 0 ? (
        <View style={styles.notification}>
          <Text style={styles.text}>{count}</Text>
        </View>
      ) : null}
      <Feather
        name={count > 0 ? "bell" : "bell-off"}
        size={24}
        color={theme.colors.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  notification: {
    backgroundColor: "#ff4d4d",
    borderRadius: 50,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  text: {
    color: "#fff",
    fontSize: 12,
  },
});

export default NotificationIndicator;
