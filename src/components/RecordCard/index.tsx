import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Platform,
  ViewStyle,
} from "react-native";
import { TouchableHighlight } from "react-native";
import useTheme from "../../hooks/useTheme";

type Props = {
  image: string;
  variant: "md" | "lg" | "xl";
  recordName: string;
  recordCreator: string;
  style?: ViewStyle;
  onItemPress?: () => void;
};

const RecordsDisplay: React.FC<Props> = ({
  image,
  variant,
  recordName,
  recordCreator,
  style,
  onItemPress,
}) => {
  const theme = useTheme();
  const scale = useMemo(() => new Animated.Value(1), []);

  const sizes = {
    lg: [200, 250],
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
        style={[styles.container, { transform: [{ scale }] }, style]}
      >
        <Image
          source={{ uri: image }}
          style={[
            { width, height, marginBottom: 10 },
            Platform.select({
              ios: {
                shadowColor: theme.colors.red,
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 10,
                shadowRadius: 3,
              },
              android: {
                elevation: 4,
                shadowColor: theme.colors.red,
              },
            }),
          ]}
        />
        <Text style={[styles.recordName, { color: theme.colors.white }]}>
          {recordName}
        </Text>
        <Text style={[styles.recordCreator, { color: theme.colors.grey }]}>
          {recordCreator}
        </Text>
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
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },
  recordName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recordCreator: {
    fontSize: 12,
  },
});

export default RecordsDisplay;
