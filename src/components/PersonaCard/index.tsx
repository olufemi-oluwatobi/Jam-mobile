import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableHighlight,
  ViewStyle,
} from "react-native";
import useTheme from "../../hooks/useTheme";

type Props = {
  image: string;
  variant: "md" | "lg" | "xl";
  text: string;
  style?: ViewStyle;
  onItemPress?: () => void;
};

const PersonaDisplay: React.FC<Props> = ({
  image,
  variant,
  text,
  style,
  onItemPress,
}) => {
  const theme = useTheme();
  const scale = useMemo(() => new Animated.Value(1), []);

  const sizes = {
    lg: [100, 100],
    xl: [200, 150],
    md: [200, 150],
  };
  const size = sizes[variant];

  const [width, height] = size;

  // handle press in event
  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 0.9,
      duration: 150,
      useNativeDriver: true,
    }).start();
    onItemPress && onItemPress();
  };

  // handle press out event
  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableHighlight
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={styles.touchable}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale }],
            borderRadius: 50,
            width,
            height,
          },
          style,
        ]}
      >
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={[styles.text, { color: theme.colors.grey }]}>{text}</Text>
      </Animated.View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  text: {
    fontSize: 12,
    marginTop: 16,
  },
});

export default PersonaDisplay;
