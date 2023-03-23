import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FloatingButtonProps {
  icon: any;
  label: string;
  count?: number;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon,
  label,
  count = 0,
}) => {
  const [animation] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animation, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: animation }],
  };

  return (
    <TouchableHighlight
      activeOpacity={0.7}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <Ionicons name={icon} size={24} color="white" />
        <Text style={styles.label}>{label}</Text>
        {count > 0 && <Text style={styles.count}>{count}</Text>}
      </Animated.View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9446a",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    elevation: 3,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 10,
  },
  count: {
    backgroundColor: "white",
    color: "#e9446a",
    fontWeight: "bold",
    fontSize: 16,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginHorizontal: 10,
  },
});

export default FloatingButton;
